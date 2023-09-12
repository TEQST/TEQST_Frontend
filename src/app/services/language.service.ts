import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

import {Language} from 'src/app/interfaces/language';
import {Constants} from 'src/app/constants';
import menuLanguagesData from '../../assets/menu-languages.json';


@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  SERVER_URL = Constants.SERVER_URL;
  public menuLanguage; //TODO maybe this should be private

  constructor(public http: HttpClient,
              private translate: TranslateService ) {
    //TODO maybe move this to getMenuLanguage to avoid loading delay
    this.initMenuLanguage();
  }

  /* load menu language from local storage
     if it is not set, either set to english if available
     or the first menu language in the list */
  initMenuLanguage() {
    this.menuLanguage = localStorage.getItem('MenuLanguage');
    if (this.menuLanguage == null) {
      for (let lang of menuLanguagesData.menuLanguages) {
        if (lang.short == 'en') {
          this.setMenuLanguage(lang.short);
          return;
        }
      }
      if (menuLanguagesData.menuLanguages.length > 0) {
        this.setMenuLanguage(menuLanguagesData.menuLanguages[0].short);
      }else {
        alert('Error: Please add at least one menu language!');
      }
    }
  }

  // returns all speakable Languages created by an admin
  getLangs(): Observable<Language[]> {
    const url = this.SERVER_URL + '/api/langs/';
    return this.http.get<Language[]>(url);
  }

  putMenuLanguageLocalStorage(): void {
    localStorage.setItem('MenuLanguage', this.menuLanguage);
  }
  putMenuLanguageLocalStorageWithParam(lang: string): void {
    localStorage.setItem('MenuLanguage', lang);
  }

  getAllMenuLanguages() {
    return menuLanguagesData.menuLanguages;
  }

  getMenuLanguage(): string {
    return this.menuLanguage;
  }

  setMenuLanguage(lang: string): void {
    if (lang !== null && lang !== undefined) {
      this.menuLanguage = lang;
      this.putMenuLanguageLocalStorageWithParam(lang);
      this.translate.use(lang);
    }
  }

  updateMenuLanguage(temporalMenuLanguage): void {
    if (temporalMenuLanguage === localStorage.getItem('MenuLanguage') ||
        localStorage.getItem('MenuLanguage') === null) {
      this.menuLanguage = temporalMenuLanguage;
    } else {
      this.menuLanguage = localStorage.getItem('MenuLanguage');
    }
  }
}

