import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import * as RecordRTC from 'recordrtc';
import { TextServiceService } from './text-service.service';


@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {

  private stream: MediaStream;
  private recorder;
  private recorded = new Map<number, Blob>()
  private recordingFailed$ = new Subject<string>();
  private state$ = new Subject<boolean>();
  private recordingLength$ = new Subject<number>();
  private recordingPosition$ = new Subject<number>();

  constructor(private textService: TextServiceService) {}

  // getRecordedBlob(): Observable<RecordedAudioOutput> {
  //   return this._recorded.asObservable();
  // }

  recordingFailed(): Observable<string> {
    return this.recordingFailed$.asObservable();
  }

  getRecordingState(): Observable<boolean> {
    return this.state$.asObservable();
  }

  startRecording() {
    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
      this.stream = s;
      this.record();
    }).catch(error => {
      this.recordingFailed$.next();
      this.state$.next(false);
      console.log(error)
    });
    
  }

  private record() {

    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      
    });
    this.recorder.record();
    this.state$.next(true);
    
  }

  stopRecording() {

    if (this.recorder) {
      this.recorder.stop((blob) => {
        //safe recording
        this.recorded.set(this.textService.getActiveSentenceIndex().getValue(), blob)
        this.stopMedia();
      }, () => {
        this.stopMedia();
        this.recordingFailed$.next();
      });
    }

  }

  private stopMedia() {
    this.state$.next(false);
    if (this.recorder) {
      this.recorder = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }

  abortRecording() {
    this.stopMedia();
  }

  playRecording() {
    let audio = new Audio();
    let blob = this.recorded.get(this.textService.getActiveSentenceIndex().getValue());
    audio.src = URL.createObjectURL(blob);
    audio.load();
    audio.play();
    
    // audio.addEventListener("timeupdate", () => {
    //   console.log(audio.currentTime)
    // })
  }

}
