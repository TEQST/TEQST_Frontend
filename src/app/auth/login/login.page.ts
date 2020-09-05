import {Component, OnInit} from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';

import {Constants} from '../../constants';
import {MenuLanguageSelectorComponent}
  from './menu-language-selector/menu-language-selector.component';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {LanguageService} from 'src/app/services/language.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  SERVER_URL = Constants.SERVER_URL;
  public showPassword = false;

  constructor(
    public navCtrl: NavController,
    public authenticationService: AuthenticationService,
    public popoverController: PopoverController,
    public languageService: LanguageService) { }

  ngOnInit() { }

  async presentMenuLanguages(ev: any) {
    const menulanguages = await this.languageService.getAllMenuLanguages();
    const popover = await this.popoverController.create({
      component: MenuLanguageSelectorComponent,
      componentProps: {
        'menuLanguages': menulanguages,
      },
      event: ev,
      translucent: true,
      showBackdrop: false,
    });

    return await popover.present();
  }

  // gets Username and Password and calls with those login in UsermgmtService
  performLogin(form) {
    this.authenticationService.login(form.value);
  }

  redirect() {
    window.open(this.SERVER_URL + '/admin');
  }

  redirectToHelp(){
   window.open(this.SERVER_URL + '/documentation');
  }

}
