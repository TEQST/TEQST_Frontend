import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {DocumentationPageRoutingModule} from './documentation-routing.module';
import {DocumentationPage} from './documentation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentationPageRoutingModule,
  ],
  declarations: [DocumentationPage],
})
export class DocumentationPageModule {}
