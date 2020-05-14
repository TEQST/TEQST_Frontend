import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslatePoHttpLoader } from '@fjnr/ngx-translate-po-http-loader';

import { RollbarService, rollbarFactory, RollbarErrorHandler } from './rollbar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServerErrorInterceptorService } from './interceptors/server-error-interceptor.service';
import { TimeoutInterceptor } from './interceptors/timeout-interceptor';
import { Constants } from './constants';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ServerAuthtokenInterceptorService} from './interceptors/server-authtoken-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: RollbarService,
      useFactory: rollbarFactory
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerAuthtokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslatePoHttpLoader(http, `${Constants.SERVER_URL}/api/locale`, '.po');
}


