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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationPageRoutingModule {}
