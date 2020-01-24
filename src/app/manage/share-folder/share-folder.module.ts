import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareFolderPageRoutingModule } from './share-folder-routing.module';

import { ShareFolderPage } from './share-folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareFolderPageRoutingModule
  ],
  declarations: [ShareFolderPage]
})
export class ShareFolderPageModule {}
