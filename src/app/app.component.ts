import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';

import {InternetConnectionService}
  from './services/internet-connection.service';
import {LanguageService} from './services/language.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private translate: TranslateService,
              private languageService: LanguageService,
              private connectionService: InternetConnectionService) {

    this.initializeApp();
  }

  ngOnInit(): void {
    if (localStorage.getItem('MenuLanguage') != null) {
      this.languageService
          .setMenuLanguage(localStorage.getItem('MenuLanguage'));
    }
  }

  initializeApp(): void {
    this.translate.setDefaultLang('en');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.connectionService.monitor();
  }
}
