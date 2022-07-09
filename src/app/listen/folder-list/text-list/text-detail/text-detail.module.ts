import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {
  SpeakerProgressTextViewComponent,
} from './speaker-progress-text-view/speaker-progress-text-view.component';
import {
  PlaybarComponent,
} from './speaker-progress-text-view/playbar/playbar.component';
import {
  BasicTextViewComponent,
} from './basic-text-view/basic-text-view.component';
import {
  SpeakerSelectPopoverComponent,
} from './speaker-select-popover/speaker-select-popover.component';
import {
  TextWrapperComponent,
} from './speaker-progress-text-view/text-wrapper/text-wrapper.component';
import {TextDetailPageRoutingModule} from './text-detail-routing.module';
import {TextDetailPage} from './text-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TextDetailPageRoutingModule,
        TranslateModule,
    ],
    declarations: [
        TextDetailPage,
        TextWrapperComponent,
        BasicTextViewComponent,
        SpeakerSelectPopoverComponent,
        PlaybarComponent,
        SpeakerProgressTextViewComponent,
    ]
})
export class TextDetailPageModule {}
