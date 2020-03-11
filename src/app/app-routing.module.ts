import { AccessGuard } from './auth/access.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'speak', pathMatch: 'full' },
  {
    path: 'speak',
    loadChildren: () => import('./speak/speak.module').then( m => m.SpeakPageModule),
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ]
  },
  {
    path: 'manage',
    loadChildren: () => import('./manage/manage.module').then( m => m.ManagePageModule),
    data: { requiresLogin: true, requiredRole: 'publisher' },
    canActivate: [ AccessGuard ]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
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
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
