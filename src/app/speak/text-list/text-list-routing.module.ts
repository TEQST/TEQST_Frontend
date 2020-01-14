import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextListPage } from './text-list.page';

const routes: Routes = [
  {
    path: '',
    component: TextListPage
  },
  {
    path: ':textId',
    loadChildren: () => import('./record-view/record-view.module').then( m => m.RecordViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextListPageRoutingModule {}
