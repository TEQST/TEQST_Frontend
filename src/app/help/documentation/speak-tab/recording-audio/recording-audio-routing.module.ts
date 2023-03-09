import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RecordingAudioPage} from './recording-audio.page';

const routes: Routes = [
  {
    path: '',
    component: RecordingAudioPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordingAudioPageRoutingModule {}
