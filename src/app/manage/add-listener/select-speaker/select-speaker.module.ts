import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectSpeakerPageRoutingModule } from './select-speaker-routing.module';

import { SelectSpeakerPage } from './select-speaker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectSpeakerPageRoutingModule
  ],
  declarations: [SelectSpeakerPage]
})
export class SelectSpeakerPageModule {}
