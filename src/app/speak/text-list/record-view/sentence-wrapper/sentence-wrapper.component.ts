import { Component, OnInit } from '@angular/core';
import {TextServiceService} from '../text-service.service'
import { AudioRecordingService } from '../audio-recording.service';

@Component({
  selector: 'app-sentence-wrapper',
  templateUrl: './sentence-wrapper.component.html',
  styleUrls: ['./sentence-wrapper.component.scss'],
})
export class SentenceWrapperComponent implements OnInit {

  sentences: String[];
  activeSentence: number;
  isRecording: boolean;
  furthestSentence: number;

  constructor(private textService: TextServiceService, private recordingService: AudioRecordingService) { }

  ngOnInit() {
    this.getSentences();
    this.getActiveSentence();
    this.getRecordingStatus();
    this.getFurthestSentence();
  }

  getFurthestSentence(): void {
    this.textService.getFurthestSentenceIndex().subscribe((index) => this.furthestSentence = index);
  }

  getRecordingStatus(): void {
    this.recordingService.getRecordingState().subscribe((state) => this.isRecording = state);
  }

  getSentences(): void {
    this.textService.getSentences().subscribe(sentences => this.sentences = sentences);
  }

  getActiveSentence(): void {
    this.textService.getActiveSentenceIndex().subscribe(index => this.activeSentence = index);
  }

  onSelect(index: number): void {
    this.recordingService.stopAudioPlaying();
    this.textService.setActiveSentenceIndex(index)
  }

}
