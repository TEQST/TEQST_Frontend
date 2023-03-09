import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListenPage} from './listen.page';

const routes: Routes = [
  {
    path: '',
    component: ListenPage,
  },
  {
    path: ':folderId',
    loadChildren: () => import('./listen-manage/listen-manage.module')
        .then( (m) => m.ListenManagePageModule),
  },
  {
    path: 'text/:textId',
    loadChildren: () => import('./listen-manage/text-detail/text-detail.module')
        .then( (m) => m.TextDetailPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListenPageRoutingModule {}
