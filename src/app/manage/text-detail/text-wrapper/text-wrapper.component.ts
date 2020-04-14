import { RecordingStateModel } from './../../../models/recording-state.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-wrapper',
  templateUrl: './text-wrapper.component.html',
  styleUrls: ['./text-wrapper.component.scss'],
})
export class TextWrapperComponent implements OnInit {

  @Input() public sentences: string[];
  @Input() private recordingState: RecordingStateModel;

  public furthestSentence: number;
  public activeSentence: number;

  constructor() { }

  ngOnInit() {
    this.subscribeToServices();
  }

  private subscribeToServices(): void {
    this.recordingState.getFurthestSentenceIndex().subscribe(index => this.furthestSentence = index);
    this.recordingState.getActiveSentenceIndex().subscribe(index => this.activeSentence = index);
  }

  // when clicking on a sentence set it to active
  onSelect(index: number): void {
    // this.playbackService.stopAudioPlayback();
    this.recordingState.setActiveSentenceIndex(index);
  }

}
