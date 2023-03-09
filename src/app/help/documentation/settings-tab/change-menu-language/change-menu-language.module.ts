import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {ChangeMenuLanguagePageRoutingModule}
  from './change-menu-language-routing.module';
import {ChangeMenuLanguagePage} from './change-menu-language.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeMenuLanguagePageRoutingModule,
  ],
  declarations: [ChangeMenuLanguagePage],
})
export class ChangeMenuLanguagePageModule {}
