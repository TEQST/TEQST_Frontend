import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManagePageRoutingModule } from './manage-routing.module';

import { ManagePage } from './manage.page';

import {CreateFolderPageModule} from './create-folder/create-folder.module';
import {CreateTextPageModule} from './create-text/create-text.module';
import { ShareFolderPageModule } from './share-folder/share-folder.module';
import { ComponentsModule } from '../tabBar/tab-bar.modules';
import { TextDetailPageModule } from './text-detail/text-detail.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ManagePageRoutingModule,
    CreateFolderPageModule,
    CreateTextPageModule,
    ShareFolderPageModule,
    TextDetailPageModule
  ],
  declarations: [ManagePage],
})
export class ManagePageModule {}
