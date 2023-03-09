import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ShareFolderSpeakerPage} from './share-folder-speaker.page';

const routes: Routes = [
  {
    path: '',
    component: ShareFolderSpeakerPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareFolderSpeakerPageRoutingModule {}
