import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpeakPageRoutingModule } from './speak-routing.module';

import { SpeakPage } from './speak.page';
import { TextListPage } from './text-list/text-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeakPageRoutingModule
  ],
  declarations: [SpeakPage, TextListPage]
})
export class SpeakPageModule {}
