import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderListPageRoutingModule } from './folder-list-routing.module';

import { FolderListPage } from './folder-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderListPageRoutingModule
  ],
  declarations: [FolderListPage]
})
export class FolderListPageModule {}
