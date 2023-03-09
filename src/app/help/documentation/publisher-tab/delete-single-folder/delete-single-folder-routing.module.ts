import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DeleteSingleFolderPage} from './delete-single-folder.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteSingleFolderPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteSingleFolderPageRoutingModule {}
