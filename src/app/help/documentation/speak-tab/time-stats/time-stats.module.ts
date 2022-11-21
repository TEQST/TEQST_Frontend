import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {TimeStatsPageRoutingModule} from './time-stats-routing.module';
import {TimeStatsPage} from './time-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeStatsPageRoutingModule,
  ],
  declarations: [TimeStatsPage],
})
export class TimeStatsPageModule {}
