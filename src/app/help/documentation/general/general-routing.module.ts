import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GeneralPage} from './general.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralPage,
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module')
            .then( (m) => m.TabsPageModule),
      },
      {
        path: 'navigation',
        loadChildren: () => import('./navigation/navigation.module')
            .then( (m) => m.NavigationPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralPageRoutingModule {}
