import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AccessGuard} from '../auth/access.guard';
import {TabsPage} from './tabs.page';
import {RouterModule, Routes} from '@angular/router';


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
        loadChildren: '../speak/speak.module#SpeakPageModule',
        data: {requiresLogin: true},
        canActivate: [AccessGuard],
      },
      {
        path: 'manage',
        loadChildren: '../manage/manage.module#ManagePageModule',
        data: {requiresLogin: true, requiredRole: 'publisher'},
        canActivate: [AccessGuard],
      },
      {
        path: 'listen',
        loadChildren: '../listen/listen.module#ListenPageModule',
        data: {requiresLogin: true, requiredRole: 'listener'},
        canActivate: [AccessGuard],
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsPageModule',
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
