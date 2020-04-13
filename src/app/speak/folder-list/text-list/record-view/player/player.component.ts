import { AudioRecordingService } from './../audio-recording.service';
import { TextServiceService } from './../text-service.service';
import { RecordingPlaybackService } from './../../../../../services/recording-playback.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  public isPlaying = false;
  public isRecording = false;
  private recordingId: number;
  private activeSentence: number;

  constructor(
    private playbackService: RecordingPlaybackService,
    private textService: TextServiceService,
    private recordingService: AudioRecordingService) {}

  ngOnInit() {
    this.subscribeToServices();
  }

  subscribeToServices(): void {
    // subscribe to the isPlaying observable and update the local variable on change
    this.playbackService.getIsPlaying().subscribe((state) => this.isPlaying = state);
    this.textService.getRecordingId().subscribe((id) => this.recordingId = id);
    this.textService.getActiveSentenceIndex().subscribe((index) => this.activeSentence = index);
    this.recordingService.getRecordingState().subscribe((state) => this.isRecording = state);
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
