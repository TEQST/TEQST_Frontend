import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DownloadStatisticsPageRoutingModule } from './download-statistics-routing.module';

import { DownloadStatisticsPage } from './download-statistics.page';
import { DownloadBasicComponent } from './download-basic/download-basic.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadStatisticsPageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    DownloadStatisticsPage,
    DownloadBasicComponent,
  ]
})
export class DownloadStatisticsPageModule {}
