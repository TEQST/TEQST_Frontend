import { MenuLanguageSelectorComponent } from './menu-language-selector/menu-language-selector.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    AuthPage,
    MenuLanguageSelectorComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthPageModule {}
