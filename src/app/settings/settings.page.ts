import {Component} from '@angular/core';
import { PopoverController } from '@ionic/angular';

import {LoaderService} from 'src/app/services/loader.service';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {LanguageService} from 'src/app/services/language.service';
import {
  MenuLanguageSelectorComponent,
} from '../auth/menu-language-selector/menu-language-selector.component';
import {BaseComponent} from 'src/app/base-component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends BaseComponent {

  constructor(public authenticationService: AuthenticationService,
              public popoverController: PopoverController,
              public languageService: LanguageService,
              public loaderService: LoaderService) {

    super(loaderService);
  }

  // calls logout Function of UsermgmtService
  logout(): void {
    this.authenticationService.logout();
  }

  async presentMenuLanguages(ev: any): Promise<void> {
    const menulanguages = this.languageService.getAllMenuLanguages();
    const popover = await this.popoverController.create({
      component: MenuLanguageSelectorComponent,
      componentProps: {
        'menuLanguages': menulanguages,
      },
      event: ev,
      translucent: false,
      showBackdrop: true,
    });

    return await popover.present();
  }

}
