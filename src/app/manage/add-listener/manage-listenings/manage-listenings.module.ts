import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageListeningsPageRoutingModule } from './manage-listenings-routing.module';

import { ManageListeningsPage } from './manage-listenings.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageListeningsPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ManageListeningsPage]
})
export class ManageListeningsPageModule {}
