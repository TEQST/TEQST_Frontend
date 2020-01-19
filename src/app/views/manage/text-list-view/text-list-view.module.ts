import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextListViewPageRoutingModule } from './text-list-view-routing.module';

import { TextListViewPage } from './text-list-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextListViewPageRoutingModule
  ],
  declarations: [TextListViewPage]
})
export class TextListViewPageModule {}
