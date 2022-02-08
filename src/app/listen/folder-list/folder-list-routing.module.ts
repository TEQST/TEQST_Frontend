import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TextListPageModule}
  from 'src/app/speak/folder-list/text-list/text-list.module';

import {FolderListPage} from './folder-list.page';

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
