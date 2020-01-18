import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, of, Observable } from 'rxjs';
import { TEXT } from './mock-text';
import { RECORDINGINFO} from './mock-recording-information';

@Injectable({
  providedIn: 'root'
})

export class TextServiceService {
  private sentences = new ReplaySubject<String[]>(1);
  // instantiate BehaviorSubjekts with 1 because every text has at least 1 sentence
  private activeSentenceIndex = new BehaviorSubject<number>(1);
  private totalSentenceNumber = new BehaviorSubject<number>(1);
  private furthestSentenceIndex = new BehaviorSubject<number>(1);
  private hasRecording = new BehaviorSubject<boolean>(false);

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

  getHasRecording(): Observable<boolean> {
    return this.hasRecording.asObservable();
  }

  getActiveSentenceIndex(): BehaviorSubject<number> {
    return this.activeSentenceIndex;
  }

  getSentences(): ReplaySubject<String[]> {
    return this.sentences;
  }

  getTotalSentenceNumber(): BehaviorSubject<number> {
    return this.totalSentenceNumber;
  }

  setActiveSentenceIndex(index: number): void {
    if(index > 0 && index <= this.totalSentenceNumber.getValue() && index <= this.furthestSentenceIndex.getValue()) {
      this.activeSentenceIndex.next(index);

      // check if sentence has recording
      if(this.activeSentenceIndex.getValue() < this.furthestSentenceIndex.getValue()) {
        this.hasRecording.next(true)
      } else {
        this.hasRecording.next(false)
      }
    }
  }

  setNextSenteceActive(): void {
    let next = this.activeSentenceIndex.getValue() + 1;
    this.setActiveSentenceIndex(next);
  }

  setPreviousSentenceActive(): void {
    let previous = this.activeSentenceIndex.getValue() - 1;
    this.setActiveSentenceIndex(previous);
  }
}
