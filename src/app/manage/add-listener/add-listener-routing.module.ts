import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddListenerPage} from './add-listener.page';

const routes: Routes = [
  {
    path: '',
    component: AddListenerPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddListenerPageRoutingModule {}
