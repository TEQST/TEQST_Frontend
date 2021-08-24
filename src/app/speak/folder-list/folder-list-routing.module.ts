import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FolderListPage} from './folder-list.page';
import {TextListPageModule} from './text-list/text-list.module';

const routes: Routes = [
  {
    path: '',
    component: FolderListPage,
  },
  {
    path: ':folderId',
    loadChildren: ()
    :Promise<TextListPageModule> => import('./text-list/text-list.module')
        .then( (m) => m.TextListPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderListPageRoutingModule {}
