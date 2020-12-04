import { LoaderService } from './../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { LanguageService } from '../services/language.service';
import { MenuLanguageSelectorComponent } from './menu-language-selector/menu-language-selector.component';
import { Constants } from '../constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  public isLoading = false;

  SERVER_URL = Constants.SERVER_URL;

  constructor(
    public navCtrl: NavController,
    public popoverController: PopoverController,
    public languageService: LanguageService,
    private loaderService: LoaderService) { 
      this.loaderService.getIsLoading()
        .subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnInit() {}

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

  redirect() {
    window.open(this.SERVER_URL + '/admin');
  }

  redirectToHelp() {
    window.open(this.SERVER_URL +  '/documentation');
  }

}
