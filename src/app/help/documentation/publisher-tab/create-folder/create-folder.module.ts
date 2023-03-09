import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {CreateFolderPageRoutingModule} from './create-folder-routing.module';
import {CreateFolderPage} from './create-folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFolderPageRoutingModule,
  ],
  declarations: [CreateFolderPage],
})
export class CreateFolderPageModule {}
