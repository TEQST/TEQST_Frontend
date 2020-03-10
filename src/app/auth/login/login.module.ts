import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { TranslateModule } from '@ngx-translate/core';

import { MenuLanguageSelectorComponent } from './menu-language-selector/menu-language-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    LoginPage,
    MenuLanguageSelectorComponent
  ],
  entryComponents: [MenuLanguageSelectorComponent]
})
export class LoginPageModule {}
