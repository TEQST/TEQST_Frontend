import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TimeStatsPage} from './time-stats.page';

const routes: Routes = [
  {
    path: '',
    component: TimeStatsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeStatsPageRoutingModule {}
