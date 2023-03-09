import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {AccessGuard} from 'src/app/auth/access.guard';
import {SpeakPageModule} from 'src/app/speak/speak.module';
import {ManagePageModule} from 'src/app/manage/manage.module';
import {ListenPageModule} from 'src/app/listen/listen.module';
import {SettingsPageModule} from 'src/app/settings/settings.module';
import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/speak',
        pathMatch: 'full',
      },
      {
        path: 'speak',
        loadChildren: ()
        :Promise<SpeakPageModule> => import(
            'src/app/speak/speak.module')
            .then((m) => m.SpeakPageModule),
        data: {requiresLogin: true},
        canActivate: [AccessGuard],
      },
      {
        path: 'manage',
        loadChildren: ()
        :Promise<ManagePageModule> => import('src/app/manage/manage.module')
            .then((m) => m.ManagePageModule),
        data: {requiresLogin: true, requiredRole: 'publisher'},
        canActivate: [AccessGuard],
      },
      {
        path: 'listen',
        loadChildren: ()
        :Promise<ListenPageModule> => import('src/app/listen/listen.module')
            .then((m) => m.ListenPageModule),
        data: {requiresLogin: true, requiredRole: 'listener'},
        canActivate: [AccessGuard],
      },
      {
        path: 'settings',
        loadChildren: ()
        :Promise<SettingsPageModule> =>
          import('src/app/settings/settings.module')
              .then((m) => m.SettingsPageModule),
        data: {requiresLogin: true},
        canActivate: [AccessGuard],
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/speak',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
