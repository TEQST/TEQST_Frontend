import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {RecordViewPageRoutingModule} from './record-view-routing.module';

import {RecordViewPage} from './record-view.page';

import {SentenceWrapperComponent}
  from './sentence-wrapper/sentence-wrapper.component';
import {RecorderComponent} from './recorder/recorder.component';
import {PlayerComponent} from './player/player.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordViewPageRoutingModule,
  ],
  declarations: [
    RecordViewPage,
    SentenceWrapperComponent,
    RecorderComponent,
    PlayerComponent,
  ],
})
export class RecordViewPageModule {}
