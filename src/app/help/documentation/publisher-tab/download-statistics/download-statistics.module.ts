import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {DownloadStatisticsPageRoutingModule}
  from './download-statistics-routing.module';
import {DownloadStatisticsPage} from './download-statistics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadStatisticsPageRoutingModule,
  ],
  declarations: [DownloadStatisticsPage],
})
export class DownloadStatisticsPageModule {}
