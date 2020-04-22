import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { TextListPageRoutingModule } from './text-list-routing.module';
import { TextListPage } from './text-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextListPageRoutingModule,
    TranslateModule
  ],
  declarations: [TextListPage]
})
export class TextListPageModule {}
