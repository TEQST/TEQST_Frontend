import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants';
import { NavController, PopoverController } from '@ionic/angular';
import { LanguageService } from '../services/language.service';
import { MenuLanguageSelectorComponent } from './menu-language-selector/menu-language-selector.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {



  constructor(
    public navCtrl: NavController,
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

  redirect() {
    window.open('/admin');
  }

  redirectToHelp() {
    window.open( '/documentation');
  }

}
