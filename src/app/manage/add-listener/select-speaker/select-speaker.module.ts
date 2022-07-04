import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectSpeakerPageRoutingModule } from './select-speaker-routing.module';

import { SelectSpeakerPage } from './select-speaker.page';
import { TranslateModule } from '@ngx-translate/core';
import { SelectSpkSpkSegComponent } from './select-spk-spk-seg/select-spk-spk-seg.component';
import { SelectSpkAccSegComponent } from './select-spk-acc-seg/select-spk-acc-seg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectSpeakerPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    SelectSpeakerPage,
    SelectSpkSpkSegComponent,
    SelectSpkAccSegComponent,
  ]
})
export class SelectSpeakerPageModule {}
