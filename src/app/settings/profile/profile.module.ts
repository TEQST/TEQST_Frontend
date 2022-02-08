import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';
import {ProfilePage} from './profile.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
