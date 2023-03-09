import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeUserPublisherPage } from './make-user-publisher.page';

const routes: Routes = [
  {
    path: '',
    component: MakeUserPublisherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeUserPublisherPageRoutingModule {}
