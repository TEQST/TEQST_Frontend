import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {IonicModule} from '@ionic/angular';

import {SpeakPageRoutingModule} from './speak-routing.module';
import {SpeakPage} from './speak.page';
import { TimeStatsComponent } from './time-stats/time-stats.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeakPageRoutingModule,
    TranslateModule,
  ],
  declarations: [SpeakPage, TimeStatsComponent],
})
export class SpeakPageModule {}
