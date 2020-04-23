import { Component, OnInit } from '@angular/core';
import { TextStateService } from 'src/app/services/text-state.service';
import { RecordingPlaybackService } from 'src/app/services/recording-playback.service';

@Component({
  selector: 'app-playbar',
  templateUrl: './playbar.component.html',
  styleUrls: ['./playbar.component.scss'],
})
export class PlaybarComponent implements OnInit {

  public isPlaying = false;
  public isRecording = false;
  private recordingId: number;
  private activeSentence: number;

  constructor(
    private playbackService: RecordingPlaybackService,
    private textStateService: TextStateService) {}

  ngOnInit() {
    this.subscribeToServices();
  }

  subscribeToServices(): void {
    // subscribe to the isPlaying observable and update the local variable on change
    this.playbackService.getIsPlaying().subscribe((state) => this.isPlaying = state);
    this.textStateService.getRecordingId().subscribe((id) => this.recordingId = id);
    this.textStateService.getActiveSentenceIndex().subscribe((index) => this.activeSentence = index);
  }

  playRecording(): void {
    // Only allow playback when no recording is active
    if (this.isRecording === false) {
      this.playbackService.playSentenceRecording(this.recordingId, this.activeSentence);
    }
  }

  stopRecording(): void {
    this.playbackService.stopAudioPlayback();
  }

}
