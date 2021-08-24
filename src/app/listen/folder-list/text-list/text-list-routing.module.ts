import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TextDetailPageModule} from './text-detail/text-detail.module';

import {TextListPage} from './text-list.page';

const routes: Routes = [
  {
    path: '',
    component: TextListPage,
  },
  {
    path: ':textId',
    loadChildren: ()
    :Promise<TextDetailPageModule> => import('./text-detail/text-detail.module')
        .then( (m) => m.TextDetailPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextListPageRoutingModule { }
