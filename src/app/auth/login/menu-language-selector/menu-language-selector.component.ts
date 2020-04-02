import { UsermgmtService } from 'src/app/services/usermgmt.service';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-menu-language-selector',
  templateUrl: './menu-language-selector.component.html',
  styleUrls: ['./menu-language-selector.component.scss'],
})
export class MenuLanguageSelectorComponent implements OnInit {

  language: string;

  constructor(private userService: UsermgmtService, private languageService: LanguageService) { }

  ngOnInit() {
    this.language = this.languageService.getMenuLanguage();
  }

  changeLanguage(): void {
    this.languageService.setMenuLanguage(this.language);
  }

}
