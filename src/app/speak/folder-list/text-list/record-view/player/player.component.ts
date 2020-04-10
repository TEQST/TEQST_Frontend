import { TextServiceService } from './../text-service.service';
import { RecordingPlaybackService } from './../../../../../services/recording-playback.service';
import { Component, OnInit } from '@angular/core';
import { AudioRecordingService } from '../audio-recording.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  public isPlaying = false;
  private recordingId: number;
  private activeSentence: number;

  constructor(private recordingService: AudioRecordingService, private playbackService: RecordingPlaybackService, private textService: TextServiceService) {
   }

  ngOnInit() {
    this.subscribeToServices();
  }

  subscribeToServices(): void {
    // subscribe to the isPlaying observable and update the local variable on change
    this.playbackService.getIsPlaying().subscribe((state) => this.isPlaying = state);
    this.textService.getRecordingId().subscribe((id) => this.recordingId = id);
    this.textService.getActiveSentenceIndex().subscribe((index) => this.activeSentence = index);
  }

  playRecording(): void {
    // TODO: When recording is active disable playback
    this.playbackService.playSentenceRecording(this.recordingId, this.activeSentence);
  }

  stopRecording(): void {
    this.playbackService.stopAudioPlayback();
  }

}
