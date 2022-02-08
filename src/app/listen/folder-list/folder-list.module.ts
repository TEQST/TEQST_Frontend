import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {FolderListPageRoutingModule} from './folder-list-routing.module';
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
