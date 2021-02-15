import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TranslateModule} from '@ngx-translate/core';

import {IonicModule} from '@ionic/angular';

import {
  CreateTextPageRoutingModule as CreateTextPageRoutingModule,
} from './create-text-routing.module';

import {CreateTextPage} from './create-text.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateTextPageRoutingModule,
    TranslateModule,
  ],
  declarations: [CreateTextPage],
})
export class CreateTextPageModule {}
