import { Component, OnInit } from '@angular/core';
import {TextServiceService} from '../text-service.service'
import { AudioRecordingService } from '../audio-recording.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss'],
})
export class RecorderComponent implements OnInit {

  public activeSentence: number;
  public totalSentenceNumber: number;
  public isRecording: boolean = false;

  constructor(private textService: TextServiceService, private recordingService: AudioRecordingService) {
    this.subscribeToServices();
  }

  ngOnInit() {}

  //subscribe to all needed variables from the services and update the locale ones on change
  private subscribeToServices(): void {
    this.textService.getActiveSentenceIndex().subscribe(index => this.activeSentence = index);
    this.textService.getTotalSentenceNumber().subscribe(totalNumber => this.totalSentenceNumber = totalNumber);
    this.recordingService.getRecordingState().subscribe((status) => this.isRecording = status);
  }

  previousSentence(): void {
    this.recordingService.stopAudioPlaying();
    this.textService.setPreviousSentenceActive();
  }

  nextSentence(): void {
    this.recordingService.stopAudioPlaying();
    if(this.isRecording === true) {
      // if currently recording start the recording of the next sentence
      this.recordingService.nextRecording();
    } else {
      this.textService.setNextSenteceActive();
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
