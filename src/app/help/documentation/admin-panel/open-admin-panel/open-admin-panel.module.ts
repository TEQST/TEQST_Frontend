import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenAdminPanelPageRoutingModule } from './open-admin-panel-routing.module';

import { OpenAdminPanelPage } from './open-admin-panel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenAdminPanelPageRoutingModule
  ],
  declarations: [OpenAdminPanelPage]
})
export class OpenAdminPanelPageModule {}
