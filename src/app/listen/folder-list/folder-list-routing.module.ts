import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderListPage } from './folder-list.page';

const routes: Routes = [
  {
    path: '',
    component: FolderListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderListPageRoutingModule {}
