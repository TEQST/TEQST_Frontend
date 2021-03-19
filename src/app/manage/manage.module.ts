import { MultiselectComponent } from './multiselect/multiselect.component';
import {FolderStatsPageModule} from './folder-stats/folder-stats.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ManagePageRoutingModule} from './manage-routing.module';
import {TranslateModule} from '@ngx-translate/core';

import {ManagePage} from './manage.page';

import {CreateFolderPageModule} from './create-folder/create-folder.module';
import {CreateTextPageModule} from './create-text/create-text.module';
import {ShareFolderPageModule} from './share-folder/share-folder.module';
import {TextDetailPageModule} from './text-detail/text-detail.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagePageRoutingModule,
    CreateFolderPageModule,
    CreateTextPageModule,
    ShareFolderPageModule,
    TextDetailPageModule,
    FolderStatsPageModule,
    TranslateModule,
  ],
  declarations: [
    ManagePage,
    MultiselectComponent
  ],
})
export class ManagePageModule {}
