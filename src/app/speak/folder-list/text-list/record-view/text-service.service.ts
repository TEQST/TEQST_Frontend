import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/constants';
import { UsermgmtService } from 'src/app/services/usermgmt.service';



@Injectable({
  providedIn: 'root'
})

export class TextServiceService {

  SERVER_URL = Constants.SERVER_URL
  AUTH_TOKEN: string; 


  // instantiate BehaviorSubjekts with 1 because every text has at least 1 sentence
  private sentences = new ReplaySubject<String[]>(1);
  private activeSentenceIndex = new BehaviorSubject<number>(1);
  private totalSentenceNumber = new BehaviorSubject<number>(1);
  private furthestSentenceIndex = new BehaviorSubject<number>(1);
  private sentenceHasRecording = new BehaviorSubject<boolean>(false);
  private recordingId = new Subject<number>();
  private textTitle = new BehaviorSubject<string>("");

  //Url Information
  private textId : number;
  private httpOptions;

  constructor(private http: HttpClient, private usermgmtService: UsermgmtService) {
    usermgmtService.getAuthToken().subscribe((token) => {
      this.AUTH_TOKEN = token;
      this.initHttpOptions();
    })
  }

  //intialise the header for the http requests
  private initHttpOptions(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.AUTH_TOKEN
      })
    };
  }

  private fetchText(): void {
    //fetch TextData from Server
    let textUrl = this.SERVER_URL + `/api/spk/texts/${this.textId}/`;

    this.http.get(textUrl, this.httpOptions).subscribe(text => {
      this.textTitle.next(text['title']);
      this.totalSentenceNumber.next(text['content'].length);
      this.sentences.next(text['content']);
    });
  }


  //set the locale variables to the data from the server
  private setRecordingInfo(recordingInfo: Object) {
    let index = recordingInfo['active_sentence']
    this.furthestSentenceIndex.next(index);
    this.recordingId.next(recordingInfo['id']);

    //when a text is finished the active_sentence on the backend is totalSentenceNumber + 1
    //so for the ui we have to set the active sentence to the smaler of those two values
    this.setActiveSentenceIndex(Math.min(index, this.totalSentenceNumber.getValue()));
  }


  //Check if the user already has a recording information and if yes set the local recording info to the data from the server
  async checkIfRecordingInfoExists(): Promise<boolean> {
    let result = false;
    let getRecordingInfoUrl = this.SERVER_URL + `/api/textrecordings/?text=${this.textId}`;

    await this.http.get(getRecordingInfoUrl, this.httpOptions).toPromise()
    .then(info => {
      if(info === null) {
        result = false;
      } else {
        this.setRecordingInfo(info[0]);
        result = true;
      }
    });
    return result
  }

  //Create a textrecording with the given permissions for the current user
  givePermissions(textToSpeech: boolean, speechRecognition: boolean ): void {
    
    let recordingInfo = {
      "text" : this.textId,
      "TTS_permission": textToSpeech,
      "SR_permission": speechRecognition
    }

    let postRecordingInfoUrl = this.SERVER_URL + `/api/textrecordings/`;

    this.http.post(postRecordingInfoUrl, recordingInfo, this.httpOptions).subscribe(info => {
      this.setRecordingInfo(info);
    })
  }

  getSentenceHasRecording(): Observable<boolean> {
    return this.sentenceHasRecording.asObservable();
  }

  getActiveSentenceIndex(): Observable<number> {
    return this.activeSentenceIndex.asObservable();
  }

  getFurthestSentenceIndex(): Observable<number> {
    return this.furthestSentenceIndex.asObservable();
  }

  getSentences(): Observable<String[]> {
    return this.sentences.asObservable();
  }

  getTotalSentenceNumber(): Observable<number> {
    return this.totalSentenceNumber.asObservable();
  }

  getRecordingId(): Observable<number> {
    return this.recordingId.asObservable();
  }

  getTextTitle(): Observable<string> {
    return this.textTitle.asObservable();
  }

  //Fetch a new text from the server based on the given id
  setTextId(id: number): void {
    this.textId = id;
    this.fetchText();
  }

  setActiveSentenceIndex(index: number): void {
    //check if the given index is within bounds
    if(index > 0 && index <= this.totalSentenceNumber.getValue() && index <= this.furthestSentenceIndex.getValue()) {
      this.activeSentenceIndex.next(index);

      // check if sentence has recording
      this.checkRecordingStatus()
    }
  }

  //Check if the current active sentence is already recorded
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
  }
}
