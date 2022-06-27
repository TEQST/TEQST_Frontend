import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectListenerPage } from './select-listener.page';

const routes: Routes = [
  {
    path: '',
    component: SelectListenerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectListenerPageRoutingModule {}
