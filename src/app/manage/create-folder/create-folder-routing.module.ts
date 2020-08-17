import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CreateFolderPage} from './create-folder.page';

const routes: Routes = [
  {
    path: '',
    component: CreateFolderPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFolderPageRoutingModule {}
