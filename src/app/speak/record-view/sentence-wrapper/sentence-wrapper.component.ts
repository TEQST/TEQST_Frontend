import {RecordingPlaybackService}
  from 'src/app/services/recording-playback.service';
import {
  Component, OnInit, ElementRef,
  QueryList, ViewChildren, AfterViewChecked, ViewChild, OnDestroy,
} from '@angular/core';
import {TextServiceService} from '../text-service.service';
import {AudioRecordingService} from '../audio-recording.service';
import {SentenceStatus} from 'src/app/interfaces/sentence-status';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-sentence-wrapper',
  templateUrl: './sentence-wrapper.component.html',
  styleUrls: ['./sentence-wrapper.component.scss'],
})
export class SentenceWrapperComponent
implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('sentenceWrapper', {read: ElementRef}) sentenceWrapper: ElementRef
  @ViewChildren('sentenceDomElement') sentenceList: QueryList<ElementRef>;

  public sentences: string[];
  public sentencesRecordingStatus: SentenceStatus[];
  public activeSentence: number;
  public isRecording: boolean;
  public furthestSentence: number;

  private ngUnsubscribe = new Subject<void>();
  private newIndex = false

  constructor(private textService: TextServiceService,
              private recordingService: AudioRecordingService,
              private playbackService: RecordingPlaybackService) {}

  ngOnInit(): void {
    this.subscribeToServices();
  }

  ngAfterViewChecked(): void {
    if (this.newIndex) {
      this.scrollToSentence(this.activeSentence);
      this.newIndex = false;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /* subscribe to all needed variables from the services
     and update the locale ones on change */
  private subscribeToServices(): void {
    this.textService.getIsLoaded().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((isLoaded) => {
          if (isLoaded) {
            this.sentenceWrapper.nativeElement.classList.add('loaded');
          }
        });
    this.textService.getFurthestSentenceIndex()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((index) => this.furthestSentence = index);
    this.textService.getSentences().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((sentences) => {
          this.sentences = sentences.map(this.removeID);
        });
    this.textService.getSentencesRecordingStatus()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((sentencesRecordingStatus) => {
          this.sentencesRecordingStatus = sentencesRecordingStatus;
        });

    this.textService.getActiveSentenceIndex()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((index) => {
          this.activeSentence = index;
          this.newIndex = true;
        });
    this.recordingService.getRecordingState()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((state) => this.isRecording = state);
  }

  // when clicking on a sentence set it to active
  onSelect(index: number): void {
    this.playbackService.stopAudioPlayback();
    this.textService.setActiveSentenceIndex(index);
  }

  private removeID(sentence: string): string {
    return sentence.replace(new RegExp('\{(.*?)\}'), '');
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
  }
}
