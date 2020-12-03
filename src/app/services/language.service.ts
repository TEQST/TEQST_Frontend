import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {Language} from '../interfaces/language';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  
  SERVER_URL = Constants.SERVER_URL;
  public menuLanguage;

  constructor(public http: HttpClient, private translate: TranslateService ) {
    this.menuLanguage = localStorage.getItem('MenuLanguage');
  }


  // returns all speakable Languages created by an admin
  getLangs(): Observable<object> {
    const url = this.SERVER_URL + '/api/langs/';
    return this.http.get<Language[]>(url);
  }


  putMenuLanguageLocalStorage() {
    localStorage.setItem('MenuLanguage', this.menuLanguage);
  }
  putMenuLanguageLocalStorageWithParam(lang: string) {
    localStorage.setItem('MenuLanguage', lang);
  }
  async getAllMenuLanguages() {
    const allMenuLangs: Language[] = [];
    await this.getLangs().toPromise().then((dataReturnFromServer: any) => {
      for (const singleLanguage of dataReturnFromServer) {
        if (singleLanguage['is_menu_language'] === true) {
          allMenuLangs.push(singleLanguage);
        }
      }
    });
    return allMenuLangs;
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
  updateMenuLanguage(temporalMenuLanguage) {
    if (temporalMenuLanguage === localStorage.getItem('MenuLanguage') ||
        localStorage.getItem('MenuLanguage') === null) {
      this.menuLanguage = temporalMenuLanguage;
    } else {
      this.menuLanguage = localStorage.getItem('MenuLanguage');
    }
  }
}

