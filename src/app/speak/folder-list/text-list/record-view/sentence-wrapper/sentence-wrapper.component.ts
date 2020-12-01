import {RecordingPlaybackService}
  from './../../../../../services/recording-playback.service';
import {
  Component, OnInit, ElementRef,
  QueryList, ViewChildren, AfterViewChecked, ViewChild,
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
  }

  @ViewChild('sentenceWrapper', {read: ElementRef}) sentenceWrapper: ElementRef
  @ViewChildren('sentenceDomElement') sentenceList: QueryList<ElementRef>;

  ngOnInit() {
    this.subscribeToServices();
  }

  ngAfterViewChecked() {
    this.scrollToSentence(this.activeSentence);
  }

  /* subscribe to all needed variables from the services
     and update the locale ones on change */
  private subscribeToServices(): void {
    this.textService.getIsLoaded()
        .subscribe((isLoaded) => {
          if (isLoaded) {
            this.sentenceWrapper.nativeElement.classList.add('loaded');
          }
        });
    this.textService.getFurthestSentenceIndex()
        .subscribe((index) => this.furthestSentence = index);
    this.textService.getSentences()
        .subscribe((sentences) => this.sentences = sentences.map(this.removeID));
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

  private removeID (sentence: string): string {
    return sentence.replace(new RegExp("\{(.*?)\}"), "")
  }

  // scroll sentence with specified index into view
  private scrollToSentence(index: number): void {
    const offset = 1;
    const sentenceArray = this.sentenceList.toArray();
    const sentenceRef = sentenceArray[index - offset];
    if (sentenceRef === undefined) {
      return;
    }
    sentenceRef.nativeElement.scrollIntoView();
    /*
    sentenceRef.nativeElement.parentNode.parentNode.scrollTop =
      sentenceRef.nativeElement.offsetTop;*/
  }
}
