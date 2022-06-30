import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddListenerPage } from './add-listener.page';


const routes: Routes = [
  {
    path: '',
    component: AddListenerPage,
  },
  // {
  //   path: 'select-speaker',
  //   loadChildren: () => import('./select-speaker/select-speaker.module')
  //       .then((m) => m.SelectSpeakerPageModule),
  // },
  // {
  //   path: 'manage-listenings',
  //   loadChildren: () => import('./manage-listenings/manage-listenings.module').then( m => m.ManageListeningsPageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddListenerPageRoutingModule {}
