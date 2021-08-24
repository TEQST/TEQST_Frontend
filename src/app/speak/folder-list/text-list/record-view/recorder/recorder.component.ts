import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {RecordingPlaybackService}
  from 'src/app/services/recording-playback.service';
import {TextServiceService} from '../text-service.service';
import {AudioRecordingService} from '../audio-recording.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss'],
})

export class RecorderComponent implements OnInit, OnDestroy {

  @ViewChild('progresBar', {read: ElementRef}) progresBar: ElementRef

  private ngUnsubscribe = new Subject<void>();

  public activeSentence: number;
  public totalSentenceNumber: number;
  public furthestSentenceIndex: number;
  public recordingProgress: number;
  public isRecording = false;
  public isLoaded = false;

  constructor(private textService: TextServiceService,
              private recordingService: AudioRecordingService,
              private playbackService: RecordingPlaybackService) {
    this.subscribeToServices();
  }

  ngOnInit(): void {
    this.recordingService.requestUserAudio();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.recordingService.stopMediaStream();
  }

  /* subscribe to all needed variables from the services
     and update the locale ones on change */
  private subscribeToServices(): void {
    this.textService.getIsLoaded().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((isLoaded) => {
          if (isLoaded) {
            this.updateProgressBar();
            this.isLoaded = true;
          }
        });
    this.textService.getActiveSentenceIndex()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((index) => {
          this.activeSentence = index;
        });
    this.textService.getTotalSentenceNumber()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((totalNumber) => {
          this.totalSentenceNumber = totalNumber;
          if (this.isLoaded) {
            this.updateProgressBar();
          }
        });
    this.textService.getFurthestSentenceIndex()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((index) => {
          this.furthestSentenceIndex = index;
          if (this.isLoaded) {
            this.updateProgressBar();
          }
        });
    this.recordingService.getRecordingState()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((status) => {
          this.isRecording = status;
        });
  }

  private updateProgressBar(): void {
    const indexOffset = 1;
    this.recordingProgress =
      (this.furthestSentenceIndex - indexOffset) / this.totalSentenceNumber;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardInput($event: any): void {
    // check which key was pressed
    switch ($event.keyCode) {
      // spacebar will start or stop recording
      case 32:
        if (this.isRecording === true) {
          this.stopRecording();
        } else {
          this.startRecording();
        }
        break;

        // down & right arrow key set next sentence active
      case 40:
      case 39:
        this.nextSentence();
        break;

        // up & left arrow key set the previous sentence active
        // if a recording is ongoing restart the recording
      case 38:
      case 37:
        if (this.isRecording) {
          this.recordingService.restartRecording();
        } else {
          this.previousSentence();
        }

    }
  }

  previousSentence(): void {
    this.playbackService.stopAudioPlayback();
    this.textService.setPreviousSentenceActive();
  }

  nextSentence(): void {
    this.playbackService.stopAudioPlayback();
    if (this.isRecording === true) {
      if (this.activeSentence === this.totalSentenceNumber) {
        this.recordingService.stopRecording();
      } else {
        this.recordingService.nextRecording();
      }
    } else {
      this.textService.setNextSentenceActive();
    }
  }

  startRecording(): void {
    this.recordingService.startRecording();
  }

  stopRecording(): void {
    this.recordingService.stopRecording();
  }

  trashRecording(): void {
    this.recordingService.abortRecording();
  }

}
