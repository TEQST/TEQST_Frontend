import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {DeleteMultipleFoldersPageRoutingModule} from './delete-multiple-folders-routing.module';
import {DeleteMultipleFoldersPage} from './delete-multiple-folders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteMultipleFoldersPageRoutingModule,
  ],
  declarations: [DeleteMultipleFoldersPage],
})
export class DeleteMultipleFoldersPageModule {}
