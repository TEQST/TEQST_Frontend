import {Component} from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';

import {LoaderService} from './../services/loader.service';
import {LanguageService} from '../services/language.service';
import {
  MenuLanguageSelectorComponent,
} from './menu-language-selector/menu-language-selector.component';
import {Constants} from '../constants';
import {BaseComponent} from '../base-component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage extends BaseComponent {

  SERVER_URL = Constants.SERVER_URL;

  constructor(
    public navCtrl: NavController,
    public popoverController: PopoverController,
    public languageService: LanguageService,
    public loaderService: LoaderService) {
    super(loaderService);
  }

  async presentMenuLanguages(ev: any): Promise<void> {
    const menulanguages = await this.languageService.getAllMenuLanguages();
    console.log(menulanguages)
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

  redirect(): void {
    window.open(this.SERVER_URL + '/admin');
  }

  redirectToHelp(): void {
    window.open(this.SERVER_URL + '/documentation');
  }

}
