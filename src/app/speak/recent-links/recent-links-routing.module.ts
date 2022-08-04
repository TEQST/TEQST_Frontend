import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentLinksPage } from './recent-links.page';

const routes: Routes = [
  {
    path: '',
    component: RecentLinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentLinksPageRoutingModule {}
