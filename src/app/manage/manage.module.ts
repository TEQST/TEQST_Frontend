import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {ManagePage} from './manage.page';
import {ManagePageRoutingModule} from './manage-routing.module';
import {FolderStatsPageModule} from './folder-stats/folder-stats.module';
import {CreateFolderPageModule} from './create-folder/create-folder.module';
import {CreateTextPageModule} from './create-text/create-text.module';
import {TextDetailPageModule} from './text-detail/text-detail.module';
import {AddListenerPageModule} from './add-listener/add-listener.module';
import { DownloadFolderComponent } from './download-folder/download-folder.component';
import { DownloadStatisticsPageModule } from './download-folder/download-statistics/download-statistics.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagePageRoutingModule,
    CreateFolderPageModule,
    CreateTextPageModule,
    TextDetailPageModule,
    FolderStatsPageModule,
    AddListenerPageModule,
    DownloadStatisticsPageModule,
    TranslateModule,
  ],
  declarations: [
    ManagePage,
    DownloadFolderComponent,
  ],
})
export class ManagePageModule {}
