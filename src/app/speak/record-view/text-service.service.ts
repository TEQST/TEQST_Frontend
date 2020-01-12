import { Injectable } from '@angular/core';
import { Sentence } from './sentence';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { TEXT } from './mock-text';
import { RECORDINGINFO} from './mock-recording-information';

@Injectable({
  providedIn: 'root'
})

export class TextServiceService {
  private sentences = new ReplaySubject<Sentence[]>(1);
  // instantiate BehaviorSubjekts with 1 because every text has at least 1 sentence
  private activeSentenceIndex = new BehaviorSubject<number>(1);
  private totalSentenceNumber = new BehaviorSubject<number>(1);
  private furthestSentenceIndex = new BehaviorSubject<number>(1);

  constructor() {
    this.fetchText();
  }

  fetchText(): void {
    of(TEXT).subscribe(text => {
      this.totalSentenceNumber.next(text.totalSentenceNumber);
      this.sentences.next(text.sentences);
    })
    of(RECORDINGINFO).subscribe(recording => {
      this.activeSentenceIndex.next(recording.nextSentence);
      this.furthestSentenceIndex.next(recording.nextSentence);
    })
  }

  getActiveSentenceIndex(): BehaviorSubject<number> {
    return this.activeSentenceIndex;
  }

  getSentences(): ReplaySubject<Sentence[]> {
    return this.sentences;
  }

  getTotalSentenceNumber(): BehaviorSubject<number> {
    return this.totalSentenceNumber;
  }

  setActiveSentenceIndex(index: number): void {
    if(index > 0 && index <= this.totalSentenceNumber.getValue()) {
      this.activeSentenceIndex.next(index);
    }
  }
}
