import {TranslateModule} from '@ngx-translate/core';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SpeakerListPageRoutingModule} from './speaker-list-routing.module';

import {SpeakerListPage} from './speaker-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeakerListPageRoutingModule,
    TranslateModule,
  ],
  declarations: [SpeakerListPage],
})
export class SpeakerListPageModule {}
