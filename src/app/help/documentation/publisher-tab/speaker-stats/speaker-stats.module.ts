import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {SpeakerStatsPageRoutingModule} from './speaker-stats-routing.module';
import {SpeakerStatsPage} from './speaker-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeakerStatsPageRoutingModule,
  ],
  declarations: [SpeakerStatsPage],
})
export class SpeakerStatsPageModule {}
