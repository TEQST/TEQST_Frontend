import { Component, OnInit } from '@angular/core';
import {TextServiceService} from '../text-service.service'
import { AudioRecordingService } from '../audio-recording.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss'],
})
export class RecorderComponent implements OnInit {

  activeSentence: number;
  isRecording: boolean = false;

  constructor(private textService: TextServiceService, private recordingService: AudioRecordingService) {
    recordingService.getRecordingState().subscribe((status) => {
      this.isRecording = status;
    })
  }

  ngOnInit() {
    this.getActiveSentence();
  }

  getActiveSentence(): void {
    this.textService.getActiveSentenceIndex().subscribe(index => this.activeSentence = index);
  }

  previousSentence(): void {
    this.textService.setPreviousSentenceActive();
  }

  nextSentence(): void {
    this.textService.setNextSenteceActive();
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
