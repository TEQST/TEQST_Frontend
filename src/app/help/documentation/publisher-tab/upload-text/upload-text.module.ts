import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {UploadTextPageRoutingModule} from './upload-text-routing.module';
import {UploadTextPage} from './upload-text.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadTextPageRoutingModule,
  ],
  declarations: [UploadTextPage],
})
export class UploadTextPageModule {}
