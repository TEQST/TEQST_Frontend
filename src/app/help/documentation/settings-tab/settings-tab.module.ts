import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsTabPageRoutingModule } from './settings-tab-routing.module';

import { SettingsTabPage } from './settings-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsTabPageRoutingModule
  ],
  declarations: [SettingsTabPage]
})
export class SettingsTabPageModule {}
