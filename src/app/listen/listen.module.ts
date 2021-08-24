import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {ListenPageRoutingModule} from './listen-routing.module';
import {ListenPage} from './listen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListenPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ListenPage],
})
export class ListenPageModule {}
