import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CreateTextPage} from './create-text.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTextPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTextPageRoutingModule {}
