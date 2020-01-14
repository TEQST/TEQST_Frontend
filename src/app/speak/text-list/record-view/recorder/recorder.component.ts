import { Component, OnInit } from '@angular/core';
import {TextServiceService} from '../text-service.service'

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss'],
})
export class RecorderComponent implements OnInit {

  activeSentence: number;
  isRecording: boolean = false;

  constructor(private textService: TextServiceService) { }

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
    this.isRecording = true;
  }

  stopRecording(): void {
    this.isRecording = false;
  }

  trashRecording(): void {
    this.isRecording = false;
  }

}
