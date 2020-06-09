import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderStatsPageRoutingModule } from './folder-stats-routing.module';

import { FolderStatsPage } from './folder-stats.page';
import { SpeakerListPage } from './speaker-list/speaker-list.page';
import { SpeakerDetailPage } from './speaker-detail/speaker-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderStatsPageRoutingModule,
    TranslateModule
  ],
  declarations: [FolderStatsPage, SpeakerListPage, SpeakerDetailPage],
  entryComponents: [SpeakerListPage, SpeakerDetailPage]
})
export class FolderStatsPageModule {}
