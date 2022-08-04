import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentLinksPageRoutingModule } from './recent-links-routing.module';

import { RecentLinksPage } from './recent-links.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentLinksPageRoutingModule
  ],
  declarations: [RecentLinksPage]
})
export class RecentLinksPageModule {}
