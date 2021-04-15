import {RecordingPlaybackService}
  from './../../../../services/recording-playback.service';
import {RecordingUploadService}
  from './../../../../services/recording-upload.service';
import {SentenceRecordingModel}
  from './../../../../models/sentence-recording.model';
import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {Injectable} from '@angular/core';
import {Observable, Subject, BehaviorSubject} from 'rxjs';

import * as RecordRTC from 'recordrtc';
import {TextServiceService} from './text-service.service';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {ToastController} from '@ionic/angular';
import {OpusService} from 'src/app/services/opus.service';


@Injectable({
  providedIn: 'root',
})

export class AudioRecordingService {


  private stream: MediaStream;
  private recorder;
  private recorded = new Map<number, Blob>();
  private audio = new Audio();

  private recordingFailed$ = new Subject<string>();
  private isRecording$ = new BehaviorSubject<boolean>(false);
  private isPlaying: boolean;

  private recordingId: number;
  private activeSentence: number;
  private furthestSentence: number;
  private sentenceHasRecording: boolean;

  private recordingTimeoutLength: number = 180000; // 3 min = 3*60*1000=180000
  private recordingTimeout;

  constructor(private textService: TextServiceService,
              public authenticationService: AuthenticationService,
              private alertService: AlertManagerService,
              private recordingUploadService: RecordingUploadService,
              private playbackService: RecordingPlaybackService,
              public toastController: ToastController,
              private opusService: OpusService) {
    this.subscribeToServices();
  }

  /* subscribe to all needed variables from the services
     and update the local ones on change */
  private subscribeToServices(): void {
    this.textService.getActiveSentenceIndex()
        .subscribe((index) => this.activeSentence = index);
    this.textService.getFurthestSentenceIndex()
        .subscribe((index) => this.furthestSentence = index);
    this.textService.getRecordingId().subscribe((id) => {
      this.recordingId = id;
      this.resetRecordingData();
    });
    this.textService.getSentenceHasRecording()
        .subscribe((value) => this.sentenceHasRecording = value);
    this.playbackService.getIsPlaying()
        .subscribe((state) => this.isPlaying = state);
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

  isMediaStreamActive(): boolean {
    if (!this.stream) {
      return false;
    } else if (!this.stream.active) {
      return false;
    }
    return true;
  }
  // TODO async
  requestUserAudio(): void {
    if (this.isMediaStreamActive()) {
      return;
    }
    navigator.mediaDevices.getUserMedia({audio: true}).then((s) => {
      this.stream = s;
    }).catch((error) => {
      this.alertService.showErrorAlertNoRedirection(
          'No microphone access',
          'Please allow access to your microphone '+
          'to be able to start a recording.');
      this.isRecording$.next(false);
    });
  }

  startRecording(): void {
    if (this.recorder) {
      return; // Recording is already running
    } else if (this.isPlaying === true) {
      this.playbackService.stopAudioPlayback();
    }
    // Get mediaStream in case user declined it on page load
    this.requestUserAudio();
    if (this.isMediaStreamActive) {

      // set the quality properties of the recorder
      this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        audioBitsPerSecond: 16000,
        desiredSampRate: 16000,
        numberOfAudioChannels: 1, // set mono recording

      });
      this.recorder.record();
      this.startRecordingTimeout();
      this.isRecording$.next(true);
    }
  }

  private async saveRecording(index: number, blob: Blob): Promise<void> {

    const opusblob = await this.opusService.encode(blob);

    const sentenceRecording =
      new SentenceRecordingModel(this.recordingId, index, opusblob);
    // add recording to cache in case speaker wants to listen to it

    this.playbackService.addToCache(sentenceRecording);
    // this.uploadRecording(sentenceRecording);
  }

  private uploadRecording(sentenceRecording: SentenceRecordingModel): void {
    this.recordingUploadService
        .uploadRecording(sentenceRecording, this.sentenceHasRecording);
  }

  stopRecording(): void {
    // check if recording is active if not do nothing
    if (this.recorder) {
      this.stopRecordingTimeout();
      this.recorder.stop((blob: Blob) => {
        this.saveRecording(this.activeSentence, blob);
        if (this.activeSentence === this.furthestSentence) {
          this.textService.increaseFurthestSentence();
        }
      }, () => {
        this.recordingFailed$.next();
      });
      this.resetRecorder();
    }

  }

  resetRecorder(): void {
    this.isRecording$.next(false);
    this.recorder = null;
  }

  // save the current recording and start the next one
  nextRecording(): void {
    if (this.recorder) {
      this.stopRecordingTimeout();
      this.recorder.stop((blob: Blob) => {
        this.saveRecording(this.activeSentence, blob);
        if (this.activeSentence === this.furthestSentence) {
          this.textService.increaseFurthestSentence();
        }
        if (this.activeSentence >= this.furthestSentence - 1) {
          this.resetRecorder();
          this.startRecording();
          this.textService.setNextSentenceActive();
        } else {
          this.resetRecorder();
          this.textService.setNextSentenceActive();
        }
      }, () => {
        this.resetRecorder();
        this.recordingFailed$.next();
      });
    }
  }

  stopMediaStream(): void {
    this.stopRecordingTimeout();
    if (this.stream) {
      this.stream.getAudioTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    this.resetRecorder();
  }

  // cancel current recording without saving
  abortRecording(): void {
    this.stopRecordingTimeout();
    this.resetRecorder();
  }

  // abort the current recording and start a new one
  restartRecording(): void {
    this.stopRecordingTimeout();
    this.recorder.stop();
    this.recorder.record();
    this.startRecordingTimeout();
  }

  startRecordingTimeout() {
    this.recordingTimeout = setTimeout(() => {
      this.showRecordingTooLongToast();
    }, this.recordingTimeoutLength);
  }

  stopRecordingTimeout() {
    clearTimeout(this.recordingTimeout);
  }

  async showRecordingTooLongToast() {
    const toast = await this.toastController.create({
      message:
       '<ion-icon name="hourglass-outline"></ion-icon><br>'+
       'Your recording seems to be very long.\n'+
       'Make sure to always click "->" to go to the next sentence.',
      duration: 10000,
      color: 'danger',
      position: 'top',
      cssClass: 'ion-text-center',
    });
    toast.present();
  }

}
