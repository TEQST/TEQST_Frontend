import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextDetailPage } from './text-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TextDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextDetailPageRoutingModule {}
