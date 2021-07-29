import {Component, OnDestroy, OnInit} from '@angular/core';
import {TextStateService} from 'src/app/services/text-state.service';
import {
  RecordingPlaybackService,
} from 'src/app/services/recording-playback.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-playbar',
  templateUrl: './playbar.component.html',
  styleUrls: ['./playbar.component.scss'],
})
export class PlaybarComponent implements OnInit, OnDestroy {

  public isPlaying = false;
  public isRecording = false;
  private recordingId: number;
  private activeSentence: number;
  private ngUnsubscribe = new Subject<void>();


  constructor(
    private playbackService: RecordingPlaybackService,
    private textStateService: TextStateService) {}

  ngOnInit(): void {
    this.subscribeToServices();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  subscribeToServices(): void {
    /* subscribe to the isPlaying observable
       and update the local variable on change */
    this.playbackService.getIsPlaying().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((state) => this.isPlaying = state);
    this.textStateService.getRecordingId().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((id) => this.recordingId = id);
    this.textStateService.getActiveSentenceIndex()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((index) => this.activeSentence = index);
  }

  playRecording(): void {
    // Only allow playback when no recording is active
    if (this.isRecording === false) {
      this.playbackService
          .playSentenceRecording(this.recordingId, this.activeSentence);
    }
  }

  stopRecording(): void {
    this.playbackService.stopAudioPlayback();
  }

}
