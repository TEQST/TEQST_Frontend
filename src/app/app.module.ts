import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslatePoHttpLoader } from '@fjnr/ngx-translate-po-http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServerErrorInterceptorService } from './services/server-error-interceptor.service'
import { Constants } from './constants';


@NgModule({
  declarations: [AppComponent],
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
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslatePoHttpLoader(http, `${Constants.SERVER_URL}/api/locale`, '.po');
}
