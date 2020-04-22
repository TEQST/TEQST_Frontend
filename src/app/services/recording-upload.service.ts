import { AlertManagerService } from './alert-manager.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SentenceRecordingModel } from './../models/sentence-recording.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UsermgmtService } from './usermgmt.service';
import { Constants } from '../constants';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RecordingUploadService {

  private SERVER_URL = Constants.SERVER_URL;
  private AUTH_TOKEN: string;
  private httpOptions;

  private uploadQueue: [SentenceRecordingModel, boolean][] = []; // array of tuple [sentenceRecording, isReUpload]
  private isUploadActive = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, public authenticationService: AuthenticationService, private alertService: AlertManagerService) {
    this.authenticationService.getAuthToken().subscribe((token) => {
      this.AUTH_TOKEN = token;
      this.initHttpOptions();
    });
  }

  // initialize the header for the http requests
  private initHttpOptions(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.AUTH_TOKEN
      })
    };
  }

  public uploadRecording(sentenceRecording: SentenceRecordingModel, isReUpload: boolean): void {
    this.uploadQueue.push([sentenceRecording, isReUpload]);
    if (!this.isUploadActive.getValue()) {
      this.uploadNextElement();
    }


  }

  private uploadNextElement() {
    this.isUploadActive.next(true);
    const queueElement = this.uploadQueue.shift();
    const isReUpload = queueElement[1];
    const sentenceRecording = queueElement[0];

    const audioFile = new File([sentenceRecording.audioBlob], 'recording.wav');

    const formData = new FormData();
    formData.append('audiofile', audioFile);
    const sentenceRecordingUrl = this.SERVER_URL + '/api/sentencerecordings/';

    if (isReUpload) {
      // replace existing sentence recording
      this.http.put(sentenceRecordingUrl + `${sentenceRecording.recordingId}/?index=${sentenceRecording.sentenceNumber}`,
        formData, this.httpOptions).subscribe( () => {
          this.checkIfQueueIsFinished();
        }, () => this.uploadFailed());
    } else {
      // create a new sentence recording
      formData.append('recording', sentenceRecording.recordingId.toString());
      formData.append('index', sentenceRecording.sentenceNumber.toString());
      this.http.post(sentenceRecordingUrl, formData, this.httpOptions).subscribe( () => {
        this.checkIfQueueIsFinished();
      }, () => this.uploadFailed());
    }


  }

  private checkIfQueueIsFinished(): void {
    if (this.uploadQueue.length > 0) {
      this.uploadNextElement();
    } else {
      this.isUploadActive.next(false);
    }
  }

  private uploadFailed(): void {
    this.alertService.showErrorAlertNoRedirection('Upload failed', 'Please reload the page', true);
    this.isUploadActive.next(false);
  }

  public getIsUploadActive(): Observable<boolean> {
    return this.isUploadActive.asObservable();
  }


}
