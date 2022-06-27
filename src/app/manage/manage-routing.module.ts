import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ManagePage} from './manage.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePage,
  },
  {
    path: ':folderId',
    component: ManagePage,
  },
  {
    path: 'text/:textId',
    loadChildren: () => import('./text-detail/text-detail.module')
        .then( (m) => m.TextDetailPageModule),
  },
  {
    path: 'filter-folder',
    loadChildren: () => import('./filter-folder/filter-folder.module').then( m => m.FilterFolderPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePageRoutingModule {}
