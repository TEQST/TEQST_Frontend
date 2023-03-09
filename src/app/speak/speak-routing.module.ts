import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FolderContentPageModule}
  from './folder-content/folder-content.module';
import {FolderContentPage} from './folder-content/folder-content.page';
import {RecordViewPageModule}
  from './record-view/record-view.module';

import {SpeakPage} from './speak.page';

const routes: Routes = [
  {
    path: '',
    component: SpeakPage,
  },
  {
    path: 'link/:folderUid',
    component: FolderContentPage,
    loadChildren: ()
    :Promise<FolderContentPageModule> => import(
        './folder-content/folder-content.module')
        .then( (m) => m.FolderContentPageModule),
  },
  {
    path: 'text/:textId',
    loadChildren: ()
    :Promise<RecordViewPageModule> => import(
        './record-view/record-view.module')
        .then( (m) => m.RecordViewPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeakPageRoutingModule {}
