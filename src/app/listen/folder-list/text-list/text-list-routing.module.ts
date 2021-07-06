import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextListPage } from './text-list.page';
import { TextDetailPage } from './text-detail/text-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TextListPage
  },
  {
    path: ':textId',
    loadChildren: () => import('./text-detail/text-detail.module')
        .then( (m) => m.TextDetailPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextListPageRoutingModule { }
