import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {UpdateInformationPageRoutingModule}
  from './update-information-routing.module';
import {UpdateInformationPage} from './update-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateInformationPageRoutingModule,
  ],
  declarations: [UpdateInformationPage],
})
export class UpdateInformationPageModule {}
