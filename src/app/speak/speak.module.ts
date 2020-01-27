import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpeakPageRoutingModule } from './speak-routing.module';

import { SpeakPage } from './speak.page';
import { ComponentsModule } from '../tabBar/components.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SpeakPageRoutingModule
  ],
  declarations: [SpeakPage]
})
export class SpeakPageModule {}
