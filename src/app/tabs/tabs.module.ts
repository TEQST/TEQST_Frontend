import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { RouterModule, Routes, Router } from '@angular/router';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'speak', loadChildren: '../speak/speak.module#SpeakPageModule' },
      { path: 'manage', loadChildren: '../manage/manage.module#ManagePageModule' },
      { path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule' },
    ]
  },
  { path: '', redirectTo: '/tabs/speak', pathMatch: 'full' },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
