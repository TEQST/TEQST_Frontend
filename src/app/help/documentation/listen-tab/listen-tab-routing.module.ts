import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListenTabPage} from './listen-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ListenTabPage,
    children: [
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module')
            .then( (m) => m.StatisticsPageModule),
      },
      {
        path: 'listening-to-speakers',
        loadChildren: () =>
          import('./listening-to-speakers/listening-to-speakers.module')
              .then( (m) => m.ListeningToSpeakersPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListenTabPageRoutingModule {}
