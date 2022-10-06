import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {DirectivesModule} from 'src/app/directives/directives.module';
import {AuthPageRoutingModule} from './auth-routing.module';
import {AuthPage} from './auth.page';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {
  MenuLanguageSelectorComponent,
} from './menu-language-selector/menu-language-selector.component';
import {
  ServicesAgreementComponent,
} from './register/services-agreement/services-agreement.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [
    AuthPage,
    MenuLanguageSelectorComponent,
    LoginComponent,
    RegisterComponent,
    ServicesAgreementComponent,
  ],
})
export class AuthPageModule {}
