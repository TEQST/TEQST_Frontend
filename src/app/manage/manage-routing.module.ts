import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagePage } from './manage.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePage
  },
  {
    path: ':folderInfo',
    component: ManagePage
  },  {
    path: 'share-folder',
    loadChildren: () => import('./share-folder/share-folder.module').then( m => m.ShareFolderPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePageRoutingModule {}
