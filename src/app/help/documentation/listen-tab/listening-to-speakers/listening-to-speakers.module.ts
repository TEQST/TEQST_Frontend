import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {ListeningToSpeakersPageRoutingModule}
  from './listening-to-speakers-routing.module';
import {ListeningToSpeakersPage} from './listening-to-speakers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeningToSpeakersPageRoutingModule,
  ],
  declarations: [ListeningToSpeakersPage],
})
export class ListeningToSpeakersPageModule {}
