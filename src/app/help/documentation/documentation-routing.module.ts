import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DocumentationPage} from './documentation.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentationPage,
    children: [
      {
        path: 'general',
        loadChildren: () => import('./general/general.module')
            .then( (m) => m.GeneralPageModule),
      },
      {
        path: 'speak-tab',
        loadChildren: () => import('./speak-tab/speak-tab.module')
            .then( (m) => m.SpeakTabPageModule),
      },
      {
        path: 'listen-tab',
        loadChildren: () => import('./listen-tab/listen-tab.module')
            .then( (m) => m.ListenTabPageModule),
      },
      {
        path: 'publisher-tab',
        loadChildren: () => import('./publisher-tab/publisher-tab.module')
            .then( (m) => m.PublisherTabPageModule),
      },
      {
        path: 'settings-tab',
        loadChildren: () => import('./settings-tab/settings-tab.module')
            .then( (m) => m.SettingsTabPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationPageRoutingModule {}
