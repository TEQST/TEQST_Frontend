import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SpeakTabPageRoutingModule} from './speak-tab-routing.module';

import {SpeakTabPage} from './speak-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeakTabPageRoutingModule,
  ],
  declarations: [SpeakTabPage],
})
export class SpeakTabPageModule {}
