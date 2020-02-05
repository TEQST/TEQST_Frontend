import { Component, OnInit } from '@angular/core';
import {TextServiceService} from '../text-service.service'
import { AudioRecordingService } from '../audio-recording.service';

@Component({
  selector: 'app-sentence-wrapper',
  templateUrl: './sentence-wrapper.component.html',
  styleUrls: ['./sentence-wrapper.component.scss'],
})
export class SentenceWrapperComponent implements OnInit {

  public sentences: String[];
  public activeSentence: number;
  public isRecording: boolean;
  public furthestSentence: number;

  constructor(private textService: TextServiceService, private recordingService: AudioRecordingService) {
    this.subscribeToServices()
   }

  ngOnInit() {}

  //subscribe to all needed variables from the services and update the locale ones on change
  private subscribeToServices(): void {
    this.textService.getFurthestSentenceIndex().subscribe((index) => this.furthestSentence = index);
    this.textService.getSentences().subscribe(sentences => this.sentences = sentences);
    this.textService.getActiveSentenceIndex().subscribe(index => this.activeSentence = index);
    this.recordingService.getRecordingState().subscribe((state) => this.isRecording = state);

  }

  // when clicking on a sentence set it to active
  onSelect(index: number): void {
    this.recordingService.stopAudioPlaying();
    this.textService.setActiveSentenceIndex(index)
  }

}
