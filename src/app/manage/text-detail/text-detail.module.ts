import { SpeakerSelectPopoverComponent } from './speaker-select-popover/speaker-select-popover.component';
import { TextWrapperComponent } from './text-wrapper/text-wrapper.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextDetailPageRoutingModule } from './text-detail-routing.module';

import { TextDetailPage } from './text-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextDetailPageRoutingModule
  ],
  declarations: [
    TextDetailPage,
    TextWrapperComponent,
    SpeakerSelectPopoverComponent
  ],
  entryComponents: [SpeakerSelectPopoverComponent]
})
export class TextDetailPageModule {}
