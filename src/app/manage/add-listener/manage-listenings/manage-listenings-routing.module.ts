import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ManageListeningsPage} from './manage-listenings.page';

const routes: Routes = [
  {
    path: '',
    component: ManageListeningsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageListeningsPageRoutingModule {}
