import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DownloadRecordingsPage} from './download-recordings.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadRecordingsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadRecordingsPageRoutingModule {}
