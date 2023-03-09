import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {ListenTabPageRoutingModule} from './listen-tab-routing.module';
import {ListenTabPage} from './listen-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListenTabPageRoutingModule,
  ],
  declarations: [ListenTabPage],
})
export class ListenTabPageModule {}
