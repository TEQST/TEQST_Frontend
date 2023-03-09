import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {ShareFolderListenerPageRoutingModule}
  from './share-folder-listener-routing.module';
import {ShareFolderListenerPage} from './share-folder-listener.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareFolderListenerPageRoutingModule,
  ],
  declarations: [ShareFolderListenerPage],
})
export class ShareFolderListenerPageModule {}
