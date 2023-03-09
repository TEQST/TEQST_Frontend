import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {AccessGuard} from './auth/access.guard';
import {AuthPageModule} from './auth/auth.module';
import {DocumentationPageModule}
  from './help/documentation/documentation.module';
import {ListenPageModule} from './listen/listen.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RecordViewPageModule}
  from './speak/record-view/record-view.module';
import {TabsPageModule} from './tabs/tabs.module';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: ()
    :Promise<TabsPageModule> => import('./tabs/tabs.module')
        .then((m) => m.TabsPageModule),
  },
  {
    path: 'speak/:publisherId/:folderId/:textId',
    loadChildren: ()
    :Promise<RecordViewPageModule> =>
      import('./speak/record-view/record-view.module')
          .then( (m) => m.RecordViewPageModule),
  },
  {
    path: 'documentation',
    loadChildren: ()
    :Promise<DocumentationPageModule> =>
      import('./help/documentation/documentation.module')
          .then( (m) => m.DocumentationPageModule),
  },
  {
    path: '',
    loadChildren: ()
    :Promise<AuthPageModule> => import('./auth/auth.module')
        .then((m) => m.AuthPageModule),
    data: {redirectIfLoggedIn: true},
    canActivate: [AccessGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {requiresLogin: true},
    canActivate: [AccessGuard],
  }, {
    path: 'listen',
    loadChildren: ()
    :Promise<ListenPageModule> =>
      import('./listen/listen.module').then( (m) => m.ListenPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
