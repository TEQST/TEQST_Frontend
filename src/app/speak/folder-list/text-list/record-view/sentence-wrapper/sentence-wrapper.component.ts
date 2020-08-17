import {RecordingPlaybackService}
  from './../../../../../services/recording-playback.service';
import {
  Component, OnInit, ElementRef,
  QueryList, ViewChildren, AfterViewChecked,
} from '@angular/core';
import {TextServiceService} from '../text-service.service';
import {AudioRecordingService} from '../audio-recording.service';

@Component({
  selector: 'app-sentence-wrapper',
  templateUrl: './sentence-wrapper.component.html',
  styleUrls: ['./sentence-wrapper.component.scss'],
})
export class SentenceWrapperComponent implements OnInit, AfterViewChecked {
  public sentences: string[];
  public activeSentence: number;
  public isRecording: boolean;
  public furthestSentence: number;

  constructor(
    private textService: TextServiceService,
    private recordingService: AudioRecordingService,
    private playbackService: RecordingPlaybackService,
  ) {
    this.subscribeToServices();
  }

  @ViewChildren('sentenceDomElement') sentenceList: QueryList<ElementRef>;

  ngOnInit() {}

  ngAfterViewChecked() {
    this.scrollToSentence(this.activeSentence);
  }

  /* subscribe to all needed variables from the services
     and update the locale ones on change */
  private subscribeToServices(): void {
    this.textService.getFurthestSentenceIndex()
        .subscribe((index) => this.furthestSentence = index);
    this.textService.getSentences()
        .subscribe((sentences) => this.sentences = sentences);
    this.textService.getActiveSentenceIndex()
        .subscribe((index) => this.activeSentence = index);
    this.recordingService.getRecordingState()
        .subscribe((state) => this.isRecording = state);
  }

  // when clicking on a sentence set it to active
  onSelect(index: number): void {
    this.playbackService.stopAudioPlayback();
    this.textService.setActiveSentenceIndex(index);
  }

  // scroll sentence with specified index into view
  private scrollToSentence(index: number): void {
    const offset = 1;
    const sentenceArray = this.sentenceList.toArray();
    const sentenceRef = sentenceArray[index - offset];
    if (sentenceRef === undefined) {
      return;
    }
    sentenceRef.nativeElement.parentNode.parentNode.scrollTop =
      sentenceRef.nativeElement.offsetTop;
  }
}
