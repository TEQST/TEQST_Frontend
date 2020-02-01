import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, of, Observable, Subject } from 'rxjs';
import { TEXT } from './mock-text';
import { Text } from './text';
import { RECORDINGINFO } from './mock-recording-information';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class TextServiceService {

  private sentences = new ReplaySubject<String[]>(1);
  // instantiate BehaviorSubjekts with 1 because every text has at least 1 sentence
  private activeSentenceIndex = new BehaviorSubject<number>(1);
  private totalSentenceNumber = new BehaviorSubject<number>(1);
  private furthestSentenceIndex = new BehaviorSubject<number>(1);
  private sentenceHasRecording = new BehaviorSubject<boolean>(false);
  private recordingId = new Subject<number>();

  //Url Information
  private textId = 2;
  private baseUrl = "http://127.0.0.1:8000";
  private textUrl = this.baseUrl + `/api/spk/texts/${this.textId}/`;
  private getRecordingInfoUrl = this.baseUrl + `/api/textrecordings/?text=${this.textId}`;
  private postRecordingInfoUrl = this.baseUrl + `/api/textrecordings/`;
  private authToken = "Token b81c0b29328e2f247da76fba6dc9d8b628cd6baf";

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.authToken
    })
  };

  constructor(private http: HttpClient) {
    this.fetchText();
  }

  fetchText(): void {
    //fetch TextData from Server
    console.log(this.httpOptions)
    this.http.get(this.textUrl, this.httpOptions).subscribe(text => {
      this.totalSentenceNumber.next(text['content'].length);
      this.sentences.next(text['content']);
    });
  }

  setRecordingInfo(recordingInfo: Object) {
    let index = recordingInfo[0]['active_sentence']
    this.activeSentenceIndex.next(Math.min(index, this.totalSentenceNumber.getValue()));
    this.furthestSentenceIndex.next(index);
    this.recordingId.next(recordingInfo[0]['id']);
  }

  async checkIfRecordingInfoExists(): Promise<boolean> {
    let result = false;
    await this.http.get(this.getRecordingInfoUrl, this.httpOptions).toPromise()
    .then(info => {
      if(info === null) {
        console.log("false")
        result = false;
      } else {
        console.log("true");
        this.setRecordingInfo(info);
        result = true;
      }
    });
    //TODO
    console.log(result)
    return result
  }

  givePermissions(textToSpeech: boolean, speechRecognition: boolean ): void {
    let recordingInfo = {
      "text" : this.textId,
      "TTS_permission": textToSpeech,
      "SP_permission": speechRecognition
    }
    this.http.post(this.postRecordingInfoUrl, recordingInfo, this.httpOptions).subscribe(info => {
      this.setRecordingInfo(info);
    })
  }

  getSentenceHasRecording(): Observable<boolean> {
    return this.sentenceHasRecording.asObservable();
  }

  getActiveSentenceIndex(): BehaviorSubject<number> {
    return this.activeSentenceIndex;
  }

  getFurthestSentenceIndex(): BehaviorSubject<number> {
    return this.furthestSentenceIndex;
  }

  getSentences(): ReplaySubject<String[]> {
    return this.sentences;
  }

  getTotalSentenceNumber(): BehaviorSubject<number> {
    return this.totalSentenceNumber;
  }

  getRecordingId(): Observable<number> {
    return this.recordingId.asObservable();
  }

  setActiveSentenceIndex(index: number): void {
    if(index > 0 && index <= this.totalSentenceNumber.getValue() && index <= this.furthestSentenceIndex.getValue()) {
      this.activeSentenceIndex.next(index);

      // check if sentence has recording
      this.checkRecordingStatus()
    }
  }

  private checkRecordingStatus(): void {
    if (this.activeSentenceIndex.getValue() < this.furthestSentenceIndex.getValue()) {
      this.sentenceHasRecording.next(true)
    } else {
      this.sentenceHasRecording.next(false)
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

  increaseFurthestSentence(): void {
    if(this.furthestSentenceIndex.getValue() <= this.totalSentenceNumber.getValue() + 1) {
      this.furthestSentenceIndex.next(this.furthestSentenceIndex.getValue() + 1);
      this.checkRecordingStatus()
    }
    console.log(this.furthestSentenceIndex.getValue())
  }
}
