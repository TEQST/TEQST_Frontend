import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminPanelPage} from './admin-panel.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelPage,
    children: [
      {
        path: 'make-user-publisher',
        loadChildren: () =>
          import('./make-user-publisher/make-user-publisher.module')
              .then( (m) => m.MakeUserPublisherPageModule),
      },
      {
        path: 'open-admin-panel',
        loadChildren: () =>
          import('./open-admin-panel/open-admin-panel.module')
              .then( (m) => m.OpenAdminPanelPageModule),
      },
      {
        path: 'add-language',
        loadChildren: () =>
          import('./add-language/add-language.module')
              .then( (m) => m.AddLanguagePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelPageRoutingModule {}
