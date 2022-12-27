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
  public menuLanguage;

  constructor(public http: HttpClient,
              private translate: TranslateService ) {
    this.menuLanguage = localStorage.getItem('MenuLanguage');
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

