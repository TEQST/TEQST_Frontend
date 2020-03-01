import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import * as RecordRTC from 'recordrtc';
import { TextServiceService } from './text-service.service';
import { Constants } from 'src/app/constants';
import { UsermgmtService } from 'src/app/services/usermgmt.service';


@Injectable({
  providedIn: 'root'
})

export class AudioRecordingService {

  SERVER_URL = Constants.SERVER_URL;
  AUTH_TOKEN: string;


  private stream: MediaStream;
  private recorder;
  private recorded = new Map<number, Blob>();
  private audio = new Audio();
  private httpOptions;

  private recordingFailed$ = new Subject<string>();
  private state$ = new Subject<boolean>();
  private isPlaying$ = new Subject<boolean>();

  private recordingId: number;
  private activeSentence: number;
  private furthestSentence: number;
  private sentenceHasRecording: boolean;



  constructor(private textService: TextServiceService, private http: HttpClient, private usermgmtService: UsermgmtService) {
    this.subscribeToServices();
  }

  // subscribe to all needed variables from the services and update the local ones on change
  private subscribeToServices(): void {
    this.usermgmtService.getAuthToken().subscribe((token) => {
      this.AUTH_TOKEN = token;
      this.initHttpOptions();
    });
    this.textService.getActiveSentenceIndex().subscribe((index) => this.activeSentence = index);
    this.textService.getFurthestSentenceIndex().subscribe((index) => this.furthestSentence = index);
    this.textService.getRecordingId().subscribe((id) => {
      this.recordingId = id;
      this.resetRecordingData();
    });
    this.textService.getSentenceHasRecording().subscribe((value) => this.sentenceHasRecording = value);
  }

  private initHttpOptions(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.AUTH_TOKEN
      })
    };
  }

  resetRecordingData(): void {
    this.recorded = new Map<number, Blob>(); // delete locally saved recordings
  }

  recordingFailed(): Observable<string> {
    return this.recordingFailed$.asObservable();
  }

  getRecordingState(): Observable<boolean> {
    return this.state$.asObservable();
  }

  getIsPlayingState(): Observable<boolean> {
    return this.isPlaying$.asObservable();
  }

  startRecording(): void {
    if (this.recorder) {
      // Recording is already running
      return;
    }

    // get user permission for microphone access
    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
      this.stream = s;
      this.record();
    }).catch(error => {
      this.recordingFailed$.next();
      this.state$.next(false);
    });

  }

  // start the actual recording
  private record(): void {

    // set the quality properties of the recorder
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      // audioBitsPerSecond: 16000,
      desiredSampRate: 16000,
      numberOfAudioChannels: 1 // set mono recording

    });
    this.recorder.record();
    this.state$.next(true);

  }

  private saveRecording(index: number, blob: Blob): void {
    this.recorded.set(index, blob); // save locally
    this.uploadRecording(index, blob);
  }

  private uploadRecording(index: number, blob: Blob): void {
    const blobFile = new File([blob], 'recording.wav');

    const formdata = new FormData();
    formdata.append('audiofile', blobFile);
    const sentenceRecordingUrl = this.SERVER_URL + '/api/sentencerecordings/';

    // check if sentence has already been recorded
    if (!this.sentenceHasRecording) {
      formdata.append('recording', this.recordingId.toString());
      formdata.append('index', index.toString());
      this.http.post(sentenceRecordingUrl, formdata, this.httpOptions).subscribe((response) => '');
    } else {
      // replace existing sentence recording
      this.http.put(sentenceRecordingUrl + `${this.recordingId}/?index=${this.activeSentence}`,
       formdata, this.httpOptions).subscribe((response) => '');
    }
  }

  stopRecording(): void {
    // check if recording is active if not do nothing
    if (this.recorder) {
      this.recorder.stop((blob: Blob) => {
        this.saveRecording(this.activeSentence, blob);
        if (this.activeSentence === this.furthestSentence) {
          this.textService.increaseFurthestSentence();
        }
        this.stopMedia();
      }, () => {
        this.stopMedia();
        this.recordingFailed$.next();
      });
    }

  }

  // save the current recording and start the next one
  nextRecording(): void {
    if (this.recorder) {
      this.recorder.stop((blob: Blob) => {
        this.saveRecording(this.activeSentence, blob);
        if (this.activeSentence === this.furthestSentence) {
          this.textService.increaseFurthestSentence();
        }
        // if the next sentence hasn't been recorded before start next recording otherwise just skip to next sentence
        if (this.activeSentence >= this.furthestSentence - 1) {
          this.record();
          this.textService.setNextSentenceActive();
        } else {
          this.stopMedia();
          this.textService.setNextSentenceActive();
        }
      }, () => {
        this.stopMedia();
        this.recordingFailed$.next();
      });
    }
  }

  // stop the recorder and free all open audio streams
  private stopMedia(): void {
    this.state$.next(false);
    if (this.recorder) {
      this.recorder = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }

  // cancel current recording without saving
  abortRecording(): void {
    this.stopMedia();
  }

  // get recordings of already recorded sentences from the server
  private async fetchSentenceRecording(): Promise<Blob> {

    // set blob as response type
    const audioHttpOptions = {
      headers: new HttpHeaders({
        Authorization: this.AUTH_TOKEN
      }),
      responseType: 'blob' as 'json'
    };

    return await this.http.get<Blob>(this.SERVER_URL + `/api/sentencerecordings/${this.recordingId}/?index=${this.activeSentence}`,
      audioHttpOptions).toPromise();
  }

  // play a recorded sentence
  async playRecording(): Promise<void> {

    let blob: Blob;

    // if a locally saved recording is available use it otherwise get the recording from server
    if (this.recorded.has(this.activeSentence)) {
      blob = this.recorded.get(this.activeSentence);
    } else {
      blob =  await this.fetchSentenceRecording();
    }
    this.audio.src = URL.createObjectURL(blob);
    this.audio.load();
    this.audio.play();

    // eventlistener to update ui during playback
    this.audio.addEventListener('play', () => {
      this.isPlaying$.next(true);
    });
    this.audio.addEventListener('pause', () => {
      this.isPlaying$.next(false);
    });

  }

  // stop audio playback
  stopAudioPlaying(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

}
