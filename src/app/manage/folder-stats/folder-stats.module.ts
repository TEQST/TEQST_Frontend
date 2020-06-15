import { SpeakerListPageModule } from './speaker-list/speaker-list.module';
import { SpeakerDetailPageModule } from './speaker-detail/speaker-detail.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderStatsPageRoutingModule } from './folder-stats-routing.module';

import { FolderStatsPage } from './folder-stats.page';
import { SpeakerListPage } from './speaker-list/speaker-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderStatsPageRoutingModule,
    TranslateModule,
    SpeakerDetailPageModule,
    SpeakerListPageModule
  ],
  declarations: [FolderStatsPage],
})
export class FolderStatsPageModule {}
