import { AccessGuard } from './auth/access.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'speak',
    loadChildren: '../speak/speak.module#SpeakPageModule',
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ]
  },
  {
    path: 'manage',
    loadChildren: '../manage/manage.module#ManagePageModule',
    data: { requiresLogin: true, requiredRole: 'publisher' },
    canActivate: [ AccessGuard ]
  },
  {
    path: 'settings',
    loadChildren: '../settings/settings.module#SettingsPageModule',
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
    data: { redirectIfLoggedIn: true },
    canActivate: [ AccessGuard ]
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule),
    data: { redirectIfLoggedIn: true },
    canActivate: [ AccessGuard ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { requiresLogin: true},
    canActivate: [ AccessGuard ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
