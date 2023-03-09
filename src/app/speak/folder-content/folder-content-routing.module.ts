import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FolderContentPage} from './folder-content.page';

const routes: Routes = [
  {
    path: '',
    component: FolderContentPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderContentPageRoutingModule {}
