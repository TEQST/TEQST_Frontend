import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsTabPage } from './settings-tab.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsTabPage
  },
  {
    path: 'change-menu-language',
    loadChildren: () => import('./change-menu-language/change-menu-language.module').then( m => m.ChangeMenuLanguagePageModule)
  },
  {
    path: 'update-information',
    loadChildren: () => import('./update-information/update-information.module').then( m => m.UpdateInformationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsTabPageRoutingModule {}
