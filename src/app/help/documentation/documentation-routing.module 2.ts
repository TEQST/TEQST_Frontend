import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentationPage } from './documentation.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationPageRoutingModule {}
