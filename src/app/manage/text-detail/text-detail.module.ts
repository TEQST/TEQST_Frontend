import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextDetailPageRoutingModule } from './text-detail-routing.module';

import { TextDetailPage } from './text-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextDetailPageRoutingModule
  ],
  declarations: [TextDetailPage]
})
export class TextDetailPageModule {}
