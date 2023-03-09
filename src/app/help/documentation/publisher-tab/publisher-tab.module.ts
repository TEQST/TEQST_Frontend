import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {PublisherTabPageRoutingModule} from './publisher-tab-routing.module';
import {PublisherTabPage} from './publisher-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublisherTabPageRoutingModule,
  ],
  declarations: [PublisherTabPage],
})
export class PublisherTabPageModule {}
