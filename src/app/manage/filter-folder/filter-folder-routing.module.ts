import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterFolderPage } from './filter-folder.page';

const routes: Routes = [
  {
    path: '',
    component: FilterFolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterFolderPageRoutingModule {}
