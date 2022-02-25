import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {IonicModule} from '@ionic/angular';

import {ShareFolderPageRoutingModule} from './share-folder-routing.module';
import {ShareFolderPage} from './share-folder.page';
import {SpeakersSegmentComponent}
  from './speakers-segment/speakers-segment.component';
import {ListenersSegmentComponent}
  from './listeners-segment/listeners-segment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareFolderPageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    ShareFolderPage,
    SpeakersSegmentComponent,
    ListenersSegmentComponent,
  ],
})
export class ShareFolderPageModule { }
