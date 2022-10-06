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
import {ShareFolderPageModule} from './share-folder/share-folder.module';
import {TextDetailPageModule} from './text-detail/text-detail.module';
import {AddListenerPageModule} from './add-listener/add-listener.module';


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
    AddListenerPageModule,
    TranslateModule,
  ],
  declarations: [
    ManagePage,
  ],
})
export class ManagePageModule {}
