import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TranslateModule} from '@ngx-translate/core';

import {IonicModule} from '@ionic/angular';

import {CreateFolderPageRoutingModule as CreateFolderPageRoutingModule}
  from './create-folder-routing.module';

import {CreateFolderPage} from './create-folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateFolderPageRoutingModule,
    TranslateModule,
  ],
  declarations: [CreateFolderPage],
})
export class CreateFolderPageModule {}
