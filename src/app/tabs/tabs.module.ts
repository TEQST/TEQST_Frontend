import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {AccessGuard} from '../auth/access.guard';
import {TabsPage} from './tabs.page';
import {RouterModule, Routes} from '@angular/router';
import {SpeakPageModule} from '../speak/speak.module';
import {ManagePageModule} from '../manage/manage.module';
import {ListenPageModule} from '../listen/listen.module';
import {SettingsPageModule} from '../settings/settings.module';

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
        :Promise<SpeakPageModule> => import('../speak/speak.module')
            .then((m) => m.SpeakPageModule),
        data: {requiresLogin: true},
        canActivate: [AccessGuard],
      },
      {
        path: 'manage',
        loadChildren: ()
        :Promise<ManagePageModule> => import('../manage/manage.module')
            .then((m) => m.ManagePageModule),
        data: {requiresLogin: true, requiredRole: 'publisher'},
        canActivate: [AccessGuard],
      },
      {
        path: 'listen',
        loadChildren: ()
        :Promise<ListenPageModule> => import('../listen/listen.module')
            .then((m) => m.ListenPageModule),
        data: {requiresLogin: true, requiredRole: 'listener'},
        canActivate: [AccessGuard],
      },
      {
        path: 'settings',
        loadChildren: ()
        :Promise<SettingsPageModule> => import('../settings/settings.module')
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
