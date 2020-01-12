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
  private activeSentenceIndex = new BehaviorSubject<number>(1);
  private totalSentenceNumber = new ReplaySubject<number>(1);
  private furthestSentenceIndex = new BehaviorSubject<number>(1);

  fetchText(): void {
    of(TEXT).subscribe( text => {
      this.totalSentenceNumber.next(text.totalSentenceNumber);
      this.sentences.next(text.sentences);
    })
    of(RECORDINGINFO).subscribe( recording => {
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

  getTotalSentenceNumber(): ReplaySubject<number> {
    return this.totalSentenceNumber;
  }

  constructor() {
    this.fetchText();
  }
}
