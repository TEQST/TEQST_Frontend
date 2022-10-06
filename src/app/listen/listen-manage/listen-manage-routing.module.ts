import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListenManagePage} from './listen-manage.page';

const routes: Routes = [
  {
    path: '',
    component: ListenManagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListenManagePageRoutingModule {}
