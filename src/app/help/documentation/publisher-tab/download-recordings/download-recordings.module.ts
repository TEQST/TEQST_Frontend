import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {DownloadRecordingsPageRoutingModule}
  from './download-recordings-routing.module';
import {DownloadRecordingsPage} from './download-recordings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadRecordingsPageRoutingModule,
  ],
  declarations: [DownloadRecordingsPage],
})
export class DownloadRecordingsPageModule {}
