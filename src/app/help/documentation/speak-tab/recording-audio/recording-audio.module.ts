import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {RecordingAudioPageRoutingModule}
  from './recording-audio-routing.module';
import {RecordingAudioPage} from './recording-audio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordingAudioPageRoutingModule,
  ],
  declarations: [RecordingAudioPage],
})
export class RecordingAudioPageModule {}
