import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OpeningLinkPage} from './opening-link.page';

const routes: Routes = [
  {
    path: '',
    component: OpeningLinkPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpeningLinkPageRoutingModule {}
