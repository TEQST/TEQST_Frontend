import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLanguagePageRoutingModule } from './add-language-routing.module';

import { AddLanguagePage } from './add-language.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLanguagePageRoutingModule
  ],
  declarations: [AddLanguagePage]
})
export class AddLanguagePageModule {}
