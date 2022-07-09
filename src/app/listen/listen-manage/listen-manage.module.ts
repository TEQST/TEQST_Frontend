import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListenManagePageRoutingModule } from './listen-manage-routing.module';

import { ListenManagePage } from './listen-manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListenManagePageRoutingModule
  ],
  declarations: [ListenManagePage]
})
export class ListenManagePageModule {}
