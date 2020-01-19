import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextListViewPage } from './text-list-view.page';

const routes: Routes = [
  {
    path: '',
    component: TextListViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextListViewPageRoutingModule {}
