import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { TabBarComponent } from 'src/app/tabBar/tab-bar.component';
import { ComponentsModule } from '../../tabBar/components.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, ]
})
export class ProfilePageModule {}
