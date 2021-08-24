import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {IonicModule} from '@ionic/angular';

import {FolderListPageRoutingModule as FolderListPageRoutingModule}
  from './folder-list-routing.module';
import {FolderListPage} from './folder-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderListPageRoutingModule,
    TranslateModule,
  ],
  declarations: [FolderListPage],
})
export class FolderListPageModule {}
