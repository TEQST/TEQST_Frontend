import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UpdateInformationPage} from './update-information.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateInformationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateInformationPageRoutingModule {}
