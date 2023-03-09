import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ChangeMenuLanguagePage} from './change-menu-language.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeMenuLanguagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeMenuLanguagePageRoutingModule {}
