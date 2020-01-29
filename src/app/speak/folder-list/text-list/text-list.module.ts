import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextListPageRoutingModule } from './text-list-routing.module';

import { TextListPage } from './text-list.page';
import { ComponentsModule } from '../../../tabBar/tab-bar.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TextListPageRoutingModule
  ],
  declarations: [TextListPage]
})
export class TextListPageModule {}
