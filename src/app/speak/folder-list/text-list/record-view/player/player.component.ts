import { Component, OnInit } from '@angular/core';
import { AudioRecordingService } from '../audio-recording.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  public isPlaying: boolean = false;

  constructor(private recordingService: AudioRecordingService) {
    this.getPlayerState();
   }

  ngOnInit() {}

  getPlayerState(): void {
    //subscribe to the isPlaying observable and update the locale variable on change
    this.recordingService.getIsPlayingState().subscribe((state) => this.isPlaying = state);
  }

  playRecording(): void {
    this.recordingService.playRecording();
  }

  stopRecording(): void {
    this.recordingService.stopAudioPlaying();
  }

}
