import { Component, OnInit, HostListener } from '@angular/core';
import {TextServiceService} from '../text-service.service';
import { AudioRecordingService } from '../audio-recording.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss'],
  // host: { '(window:keydown)': 'handleKeyboardInput($event)' },
})
export class RecorderComponent implements OnInit {

  public activeSentence: number;
  public totalSentenceNumber: number;
  public isRecording = false;

  constructor(private textService: TextServiceService, private recordingService: AudioRecordingService) {
    this.subscribeToServices();
  }

  ngOnInit() {}

  // subscribe to all needed variables from the services and update the locale ones on change
  private subscribeToServices(): void {
    this.textService.getActiveSentenceIndex().subscribe(index => this.activeSentence = index);
    this.textService.getTotalSentenceNumber().subscribe(totalNumber => this.totalSentenceNumber = totalNumber);
    this.recordingService.getRecordingState().subscribe((status) => this.isRecording = status);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardInput($event: any) {
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
    this.recordingService.stopAudioPlaying();
    this.textService.setPreviousSentenceActive();
  }

  nextSentence(): void {
    this.recordingService.stopAudioPlaying();
    if (this.isRecording === true) {
      // if currently recording start the recording of the next sentence
      this.recordingService.nextRecording();
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
