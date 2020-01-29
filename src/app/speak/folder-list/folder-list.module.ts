import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderListPageRoutingModule as FolderListPageRoutingModule } from './folder-list-routing.module';

import { FolderListPage } from './folder-list.page';
import { ComponentsModule } from '../../tabBar/tab-bar.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FolderListPageRoutingModule
  ],
  declarations: [FolderListPage]
})
export class FolderListPageModule {}
