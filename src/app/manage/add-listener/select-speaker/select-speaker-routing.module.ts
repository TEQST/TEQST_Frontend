import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectSpeakerPage } from './select-speaker.page';

const routes: Routes = [
  {
    path: '',
    component: SelectSpeakerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectSpeakerPageRoutingModule {}
