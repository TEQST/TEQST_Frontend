import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {DeleteSingleFolderPageRoutingModule}
  from './delete-single-folder-routing.module';
import {DeleteSingleFolderPage} from './delete-single-folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteSingleFolderPageRoutingModule,
  ],
  declarations: [DeleteSingleFolderPage],
})
export class DeleteSingleFolderPageModule {}
