import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadContentPage } from './download-content.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadContentPageRoutingModule {}
