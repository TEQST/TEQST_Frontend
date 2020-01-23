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
  totalSentenceNumber: number;
  isRecording: boolean = false;

  constructor(private textService: TextServiceService, private recordingService: AudioRecordingService) {
    recordingService.getRecordingState().subscribe((status) => {
      this.isRecording = status;
    })
  }

  ngOnInit() {
    this.subscribeTextService();
  }

  subscribeTextService(): void {
    this.textService.getActiveSentenceIndex().subscribe(index => this.activeSentence = index);
    this.textService.getTotalSentenceNumber().subscribe(totalNumber => this.totalSentenceNumber = totalNumber);
  }

  previousSentence(): void {
    this.recordingService.stopAudioPlaying();
    this.textService.setPreviousSentenceActive();
  }

  nextSentence(): void {
    this.recordingService.stopAudioPlaying();
    if(this.isRecording === true) {
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
