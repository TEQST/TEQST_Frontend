import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterFolderPageRoutingModule } from './filter-folder-routing.module';

import { FilterFolderPage } from './filter-folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterFolderPageRoutingModule
  ],
  declarations: [FilterFolderPage]
})
export class FilterFolderPageModule {}
