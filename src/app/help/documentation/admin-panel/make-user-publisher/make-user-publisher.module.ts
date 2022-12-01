import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeUserPublisherPageRoutingModule } from './make-user-publisher-routing.module';

import { MakeUserPublisherPage } from './make-user-publisher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeUserPublisherPageRoutingModule
  ],
  declarations: [MakeUserPublisherPage]
})
export class MakeUserPublisherPageModule {}
