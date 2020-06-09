import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderStatsPage } from './folder-stats.page';

const routes: Routes = [
  {
    path: '',
    component: FolderStatsPage
  },
  {
    path: 'speaker-detail',
    loadChildren: () => import('./speaker-detail/speaker-detail.module').then( m => m.SpeakerDetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderStatsPageRoutingModule {}
