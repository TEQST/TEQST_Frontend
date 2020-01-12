import { Injectable } from '@angular/core';
import { Sentence } from './sentence';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextServiceService {
  private sentences = new ReplaySubject<Sentence[]>(1);
  private activeSentenceIndex = new BehaviorSubject<number>(1);
  private totalSentenceNumber = new ReplaySubject<number>(1);
  private furthestSentenceIndex = new BehaviorSubject<number>(1);

  getActiveSentenceIndex(): BehaviorSubject<number> {
    return this.activeSentenceIndex;
  }

  getSentences(): ReplaySubject<Sentence[]> {
    return this.sentences;
  }

  getTotalSentenceNumber(): ReplaySubject<number> {
    return this.totalSentenceNumber;
  }
}
