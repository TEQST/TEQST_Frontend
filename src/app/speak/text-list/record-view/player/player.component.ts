import { Component, OnInit } from '@angular/core';
import { AudioRecordingService } from '../audio-recording.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  constructor(private recordingService: AudioRecordingService) { }

  ngOnInit() {}

  playRecording(): void {
    this.recordingService.playRecording()
  }

}
