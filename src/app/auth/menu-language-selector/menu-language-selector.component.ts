import {Component} from '@angular/core';
import {NavParams} from '@ionic/angular';

import {LanguageService} from 'src/app/services/language.service';


@Component({
  selector: 'app-menu-language-selector',
  templateUrl: './menu-language-selector.component.html',
  styleUrls: ['./menu-language-selector.component.scss'],
})
export class MenuLanguageSelectorComponent {
  language: string;
  menuLanguages: string[] = [];

  constructor(public navParams: NavParams,
              private languageService: LanguageService) {

    this.menuLanguages = navParams.get('menuLanguages');
    this.language = this.languageService.getMenuLanguage();
  }

  changeLanguage(): void {
    this.languageService.setMenuLanguage(this.language);
  }
}
