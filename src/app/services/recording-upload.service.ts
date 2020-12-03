import { RecordingUploadResponse } from './../interfaces/recording-upload-response';
import { AlertManagerService } from './alert-manager.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SentenceRecordingModel } from './../models/sentence-recording.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RecordingUploadService {

  private httpOptions;

  // array of tuple [sentenceRecording, isReUpload]
  private uploadQueue: [SentenceRecordingModel, boolean][] = [];
  private isUploadActive = new BehaviorSubject<boolean>(false);
  private lastUploadResponse = new BehaviorSubject<RecordingUploadResponse>(null);

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService,
    private alertService: AlertManagerService) { }

  public uploadRecording(
    sentenceRecording: SentenceRecordingModel,
    isReUpload: boolean): void {

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
    const sentenceRecordingUrl = '/api/sentencerecordings/';

    if (isReUpload) {
      // replace existing sentence recording
      const url = sentenceRecordingUrl +
        sentenceRecording.recordingId +
        `/?index=${sentenceRecording.sentenceNumber}`;
      this.http.put<RecordingUploadResponse>(
        url,
        formData).subscribe((response) => {
          this.lastUploadResponse.next(response);
          this.checkIfQueueIsFinished();
        }, () => this.uploadFailed());
    } else {
      // create a new sentence recording
      formData.append('recording', sentenceRecording.recordingId.toString());
      formData.append('index', sentenceRecording.sentenceNumber.toString());
      this.http.post<RecordingUploadResponse>(
        sentenceRecordingUrl,
        formData).subscribe((response) => {
          this.lastUploadResponse.next(response);
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
    this.alertService.showErrorAlertNoRedirection(
      'Upload failed',
      'Please reload the page',
      true);
    this.isUploadActive.next(false);
  }

  public getIsUploadActive(): Observable<boolean> {
    return this.isUploadActive.asObservable();
  }

  public getLastUploadResponse(): Observable<RecordingUploadResponse> {
    return this.lastUploadResponse.asObservable();
  }

}
