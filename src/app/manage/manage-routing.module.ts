import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagePage } from './manage.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePage
  },
  {
    path: ':folderId',
    component: ManagePage
  },
  {
    path: 'text/:textId',
    loadChildren: () => import('./text-detail/text-detail.module').then( m => m.TextDetailPageModule)
  },
  {
    path: 'folder-stats',
    loadChildren: () => import('./folder-stats/folder-stats.module').then( m => m.FolderStatsPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePageRoutingModule {}
