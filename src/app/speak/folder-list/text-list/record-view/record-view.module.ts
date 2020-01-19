import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordViewPageRoutingModule } from './record-view-routing.module';

import { RecordViewPage } from './record-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordViewPageRoutingModule
  ],
  declarations: [RecordViewPage]
})
export class RecordViewPageModule {}
