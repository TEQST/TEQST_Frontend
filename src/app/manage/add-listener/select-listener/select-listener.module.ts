import {TranslateModule} from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectListenerPageRoutingModule } from './select-listener-routing.module';

import { SelectListenerPage } from './select-listener.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectListenerPageRoutingModule,
    TranslateModule,
  ],
  declarations: [SelectListenerPage]
})
export class SelectListenerPageModule {}
