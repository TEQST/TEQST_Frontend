import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { TabBarComponent } from 'src/app/tabBar/tab-bar.component';
import { ComponentsModule } from '../tabBar/tab-bar.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    SettingsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
