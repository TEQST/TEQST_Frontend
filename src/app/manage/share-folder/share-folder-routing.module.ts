import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareFolderPage } from './share-folder.page';

const routes: Routes = [
  {
    path: '',
    component: ShareFolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareFolderPageRoutingModule {}
