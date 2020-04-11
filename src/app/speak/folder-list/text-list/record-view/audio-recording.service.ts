import { RecordingPlaybackService } from './../../../../services/recording-playback.service';
import { RecordingUploadService } from './../../../../services/recording-upload.service';
import { SentenceRecordingModel } from './../../../../models/sentence-recording.model';
import { AlertManagerService } from 'src/app/services/alert-manager.service';
import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

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
  private isRecording$ = new BehaviorSubject<boolean>(false);
  private isPlaying: boolean;

  private recordingId: number;
  private activeSentence: number;
  private furthestSentence: number;
  private sentenceHasRecording: boolean;



  constructor(private textService: TextServiceService,
              private usermgmtService: UsermgmtService,
              private alertService: AlertManagerService,
              private recordingUploadService: RecordingUploadService,
              private playbackService: RecordingPlaybackService) {
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
    this.playbackService.getIsPlaying().subscribe((state) => this.isPlaying = state);
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
    return this.isRecording$.asObservable();
  }

  startRecording(): void {
    if (this.recorder) {
      // Recording is already running
      return;
    } else if (this.isPlaying === true) {
      this.playbackService.stopAudioPlayback();
    }

    // get user permission for microphone access
    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
      this.stream = s;
      this.record();
    }).catch(error => {
      this.alertService.showErrorAlertNoRedirection('No microphone access', 'Please allow access to your microphone to be able to start a recording')
      this.isRecording$.next(false);
    });

  }

  // start the actual recording
  private record(): void {

    // set the quality properties of the recorder
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      audioBitsPerSecond: 16000,
      desiredSampRate: 16000,
      numberOfAudioChannels: 1 // set mono recording

    });
    this.recorder.record();
    this.isRecording$.next(true);

  }

  private saveRecording(index: number, blob: Blob): void {
    const sentenceRecording = new SentenceRecordingModel(this.recordingId, index, blob);
    this.playbackService.addToCache(sentenceRecording); // add recording to cache in case speaker wants to listen to it
    this.uploadRecording(sentenceRecording);
  }

  private uploadRecording(sentenceRecording: SentenceRecordingModel): void {
    this.recordingUploadService.uploadRecording(sentenceRecording, this.sentenceHasRecording);
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
    this.isRecording$.next(false);
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

  // abort the current recording and start a new one
  restartRecording(): void {
    this.recorder.stop();
    this.recorder.record();
  }

}
