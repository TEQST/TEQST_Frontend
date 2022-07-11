import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListenPage} from './listen.page';
// import {FolderListPageModule} from './folder-list/folder-list.module';

const routes: Routes = [
  {
    path: '',
    component: ListenPage,
  },
  {
    path: ':folderId',
    loadChildren: () => import('./listen-manage/listen-manage.module')
        .then( m => m.ListenManagePageModule)
  },
  {
    path: 'text/:textId',
    loadChildren: () => import('./listen-manage/text-detail/text-detail.module')
        .then( (m) => m.TextDetailPageModule)
  },

  // {
  //   path: ':publisherId',
  //   loadChildren: ():
  //   Promise<FolderListPageModule> => import('./folder-list/folder-list.module')
  //       .then( (m) => m.FolderListPageModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListenPageRoutingModule {}
