import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListenPage } from './listen.page';

const routes: Routes = [
  {
    path: '',
    component: ListenPage
  },
  {
    path: ':publisherId',
    loadChildren: () => import('./folder-list/folder-list.module')
        .then( (m) => m.FolderListPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListenPageRoutingModule {}
