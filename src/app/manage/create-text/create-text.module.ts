import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTextPageRoutingModule as CreateTextPageRoutingModule } from './create-text-routing.module';

import { CreateTextPage } from './create-text.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTextPageRoutingModule
  ],
  declarations: [CreateTextPage]
})
export class CreateTextPageModule {}
