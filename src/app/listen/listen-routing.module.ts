import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListenPage } from './listen.page';

const routes: Routes = [
  {
    path: '',
    component: ListenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListenPageRoutingModule {}
