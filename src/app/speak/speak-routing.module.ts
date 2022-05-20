import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { RecordViewPageModule } from './folder-list/text-list/record-view/record-view.module';

import {SpeakPage} from './speak.page';

const routes: Routes = [
  {
    path: '',
    component: SpeakPage,
  },
  {
    path: ':folderUid',
    component: SpeakPage,
  },
  // {
  //   path: ':publisherId',
  //   loadChildren: () => import('./folder-list/folder-list.module')
  //       .then( (m) => m.FolderListPageModule),
  // },
  {
    path: 'text/:textId',
    loadChildren: ()
    :Promise<RecordViewPageModule> => import(
        './folder-list/text-list/record-view/record-view.module')
        .then( (m) => m.RecordViewPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeakPageRoutingModule {}
