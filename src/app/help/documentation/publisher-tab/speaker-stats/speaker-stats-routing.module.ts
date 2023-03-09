import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SpeakerStatsPage} from './speaker-stats.page';

const routes: Routes = [
  {
    path: '',
    component: SpeakerStatsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeakerStatsPageRoutingModule {}
