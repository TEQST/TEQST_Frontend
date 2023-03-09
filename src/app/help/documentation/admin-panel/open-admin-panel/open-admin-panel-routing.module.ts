import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenAdminPanelPage } from './open-admin-panel.page';

const routes: Routes = [
  {
    path: '',
    component: OpenAdminPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenAdminPanelPageRoutingModule {}
