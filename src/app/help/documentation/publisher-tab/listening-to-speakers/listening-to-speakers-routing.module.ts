import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListeningToSpeakersPage} from './listening-to-speakers.page';

const routes: Routes = [
  {
    path: '',
    component: ListeningToSpeakersPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeningToSpeakersPageRoutingModule {}
