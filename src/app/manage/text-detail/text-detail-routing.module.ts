import { SpeakerProgressTextViewComponent } from './speaker-progress-text-view/speaker-progress-text-view.component';
import { BasicTextViewComponent } from './basic-text-view/basic-text-view.component';
import { TextWrapperComponent } from './speaker-progress-text-view/text-wrapper/text-wrapper.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextDetailPage } from './text-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TextDetailPage,
    children: [{
      path: ':speaker',
      component: SpeakerProgressTextViewComponent
    },
    {
      path: '',
      component: BasicTextViewComponent
    }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextDetailPageRoutingModule {}
