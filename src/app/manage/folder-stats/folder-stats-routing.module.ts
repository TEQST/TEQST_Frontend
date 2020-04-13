import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderStatsPage } from './folder-stats.page';

const routes: Routes = [
  {
    path: '',
    component: FolderStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderStatsPageRoutingModule {}
