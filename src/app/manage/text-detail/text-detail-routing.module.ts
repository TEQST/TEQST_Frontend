import { TextWrapperComponent } from './text-wrapper/text-wrapper.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextDetailPage } from './text-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TextDetailPage,
    children: [{
      path: ':speaker',
      component: TextWrapperComponent
    }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextDetailPageRoutingModule {}
