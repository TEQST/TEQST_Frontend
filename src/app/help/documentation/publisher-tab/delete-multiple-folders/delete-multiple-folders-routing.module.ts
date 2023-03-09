import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DeleteMultipleFoldersPage} from './delete-multiple-folders.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteMultipleFoldersPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteMultipleFoldersPageRoutingModule {}
