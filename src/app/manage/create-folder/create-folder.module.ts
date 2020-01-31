import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFolderPageRoutingModule as CreateFolderPageRoutingModule } from './create-folder-routing.module';

import { CreateFolderPage } from './create-folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateFolderPageRoutingModule
  ],
  declarations: [CreateFolderPage]
})
export class CreateFolderPageModule {}
