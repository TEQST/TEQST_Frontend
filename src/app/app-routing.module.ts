import {AccessGuard} from './auth/access.guard';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: './tabs/tabs.module#TabsPageModule',
  },
  {
    path: 'speak/:publisherId/:folderId/:textId',
    loadChildren: () =>
      import('./speak/folder-list/text-list/record-view/record-view.module')
          .then( (m) => m.RecordViewPageModule),
  },
  {
    path: 'documentation',
    loadChildren: () => import('./help/documentation/documentation.module')
        .then( (m) => m.DocumentationPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module')
        .then((m) => m.AuthPageModule),
    data: {redirectIfLoggedIn: true},
    canActivate: [AccessGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {requiresLogin: true},
    canActivate: [AccessGuard],
  },   {
    path: 'listen',
    loadChildren: () => import('./listen/listen.module').then( m => m.ListenPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
