import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddListenerPageRoutingModule } from './add-listener-routing.module';

import { AddListenerPage } from './add-listener.page';
import { TranslateModule } from '@ngx-translate/core';
import { SelectListenerPageModule }
  from './select-listener/select-listener.module';
import { SelectSpeakerPageModule }
  from './select-speaker/select-speaker.module';
import { ManageListeningsPageModule } from './manage-listenings/manage-listenings.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddListenerPageRoutingModule,
    TranslateModule,
    SelectListenerPageModule,
    SelectSpeakerPageModule,
    ManageListeningsPageModule,
  ],
  declarations: [AddListenerPage]
})
export class AddListenerPageModule {}
