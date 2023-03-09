import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SpeakTabPage} from './speak-tab.page';

const routes: Routes = [
  {
    path: '',
    component: SpeakTabPage,
    children: [
      {
        path: 'opening-link',
        loadChildren: () => import('./opening-link/opening-link.module')
            .then( (m) => m.OpeningLinkPageModule),
      },
      {
        path: 'recording-audio',
        loadChildren: () => import('./recording-audio/recording-audio.module')
            .then( (m) => m.RecordingAudioPageModule),
      },
      {
        path: 'time-stats',
        loadChildren: () => import('./time-stats/time-stats.module')
            .then( (m) => m.TimeStatsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeakTabPageRoutingModule {}
