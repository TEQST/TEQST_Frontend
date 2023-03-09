import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DownloadStatisticsPage} from './download-statistics.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadStatisticsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadStatisticsPageRoutingModule {}
