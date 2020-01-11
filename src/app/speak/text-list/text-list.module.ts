import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextListPageRoutingModule } from './text-list-routing.module';

import { TextListPage } from './text-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextListPageRoutingModule
  ],
  declarations: [TextListPage]
})
export class TextListPageModule {}
