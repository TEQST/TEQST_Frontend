import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ShareFolderListenerPage} from './share-folder-listener.page';

const routes: Routes = [
  {
    path: '',
    component: ShareFolderListenerPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareFolderListenerPageRoutingModule {}
