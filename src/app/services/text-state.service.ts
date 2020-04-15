import { RecordingStateModel } from './../models/recording-state.model';
import { TextObject } from './../interfaces/text-object';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextStateService {

  private sentences = new BehaviorSubject<string[]>([]);
  private activeSentenceIndex = new BehaviorSubject<number>(1);
  private totalSentenceNumber = new BehaviorSubject<number>(1);
  private furthestSentenceIndex = new BehaviorSubject<number>(1);
  private textTitle = new BehaviorSubject<string>('');
  private isRightToLeft = new BehaviorSubject<boolean>(false);
  private recordingId = new ReplaySubject<number>(1);

  constructor() { }

  public setText(text: TextObject): void {
    this.textTitle.next(text.title);
    this.totalSentenceNumber.next(text.content.length);
    this.sentences.next(text.content);
    this.isRightToLeft.next(text.is_right_to_left);
  }

  public setRecordingState(recordingState: RecordingStateModel) {
    const index = recordingState.activeSentence;
    this.furthestSentenceIndex.next(index);
    this.recordingId.next(recordingState.activeSentence);

    // when a text is finished the active_sentence on the backend is totalSentenceNumber + 1
    // so for the ui we have to set the active sentence to the smaller of those two values
    this.setActiveSentenceIndex(Math.min(index, this.totalSentenceNumber.getValue()));
  }

  public setActiveSentenceIndex(index: number): void {
    // check if the given index is within bounds
    if (index > 0 && index <= this.totalSentenceNumber.getValue() && index <= this.furthestSentenceIndex.getValue()) {
      this.activeSentenceIndex.next(index);
    }
  }

  public setNextSentenceActive(): void {
    const next = this.activeSentenceIndex.getValue() + 1;
    this.setActiveSentenceIndex(next);
  }

  public setPreviousSentenceActive(): void {
    const previous = this.activeSentenceIndex.getValue() - 1;
    this.setActiveSentenceIndex(previous);
  }

  public increaseFurthestSentence(): void {
    if (this.furthestSentenceIndex.getValue() <= this.totalSentenceNumber.getValue() + 1) {
      this.furthestSentenceIndex.next(this.furthestSentenceIndex.getValue() + 1);
    }
  }

  public getActiveSentenceIndex(): Observable<number> {
    return this.activeSentenceIndex;
  }

  public getFurthestSentenceIndex(): Observable<number> {
    return this.furthestSentenceIndex.asObservable();
  }

  public getSentences(): Observable<string[]> {
    return this.sentences.asObservable();
  }

  public getTotalSentenceNumber(): Observable<number> {
    return this.totalSentenceNumber.asObservable();
  }

  public getTextTitle(): Observable<string> {
    return this.textTitle.asObservable();
  }

  public getIsRightToLeft(): Observable<boolean> {
    return this.isRightToLeft.asObservable();
  }
}

