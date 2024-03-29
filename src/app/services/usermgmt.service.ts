import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {BehaviorSubject, Observable} from 'rxjs';

import {Constants} from 'src/app/constants';
import {Country} from 'src/app/interfaces/country';
import {ProfileData} from 'src/app/interfaces/profile-data';
import {User} from 'src/app/interfaces/user';
import {RollbarService} from 'src/app/rollbar';
import {LanguageService} from './language.service';

@Injectable({
  providedIn: 'root',
})

export class UsermgmtService {

  SERVER_URL = Constants.SERVER_URL;

  public isPublisher = new BehaviorSubject<boolean>(undefined);
  public isListener = new BehaviorSubject<boolean>(undefined);
  // tslint:disable: no-string-literal

  constructor(public http: HttpClient,
              public navCtrl: NavController,
              public languageService: LanguageService,
              private injector: Injector) {}

  // check if username is available
  checkUsername(username: string): Observable<object> {
    const url = this.SERVER_URL + '/api/users/checkname/?username=' + username;
    return this.http.get(url);
  }

  // notifies the Server about profile changes
  updateProfile(dataToSend): Observable<object> {
    const url = this.SERVER_URL + '/api/user/';
    return this.http.put(url, dataToSend);
  }

  patchProfile(dataToSend): Observable<object> {
    const url = this.SERVER_URL + '/api/user/';
    return this.http.patch(url, dataToSend);
  }

  // deletes Authtoken and clears localStorage
  deleteStoredUserData(): void {
    // keep menu language in local storage
    const tempLanguage = localStorage.getItem('MenuLanguage');
    localStorage.clear();
    if ( tempLanguage != null) {
      // localStorage.setItem('MenuLanguage', temp);
      this.languageService.putMenuLanguageLocalStorageWithParam(tempLanguage);
    }
  }

  // gets all the information about the User who is currently logged in
  getProfileData(): Observable<ProfileData> {
    const url = this.SERVER_URL + '/api/user/';
    return this.http.get<ProfileData>(url);
  }

  storeUserData(userData: User): void {
    localStorage.setItem(
        'isPublisher',
        JSON.stringify(this.isPublisher.getValue()));
    localStorage.setItem(
        'isListener',
        JSON.stringify(this.isListener.getValue()));
    localStorage.setItem('userId', userData.id.toString());
    localStorage.setItem('username', userData.username);
  }
  // returns boolean if a user is a publisher
  getIsPublisher(): Observable<boolean> {
    this.isPublisher.next(JSON.parse(localStorage.getItem('isPublisher')));
    return this.isPublisher.asObservable();
  }

  // returns boolean if a user is a listener
  getIsListener(): Observable<boolean> {
    this.isListener.next(JSON.parse(localStorage.getItem('isListener')));
    return this.isListener.asObservable();
  }

  // add user id and username to the error logging
  public initLoggingData(id: number, username: string): void {
    const rollbar = this.injector.get(RollbarService);
    rollbar.configure({
      payload: {
        person: {
          id,
          username,
        },
      },
    });
  }

  public clearLoggingData(): void {
    const rollbar = this.injector.get(RollbarService);
    rollbar.configure({
      payload: {
        person: {
          id: null,
          username: null,
        },
      },
    });
  }

  public getAccents(): Observable<string[]> {
    const url = this.SERVER_URL + '/api/accents/';
    return this.http.get<string[]>(url);
  }

  private getCountries(): Observable<object> {
    const url = this.SERVER_URL + '/api/countries/';
    return this.http.get(url);
  }

  public async getCountryList(): Promise<Country[]> {
    const countryList: Country[] = [];
    const countryObj = await this.getCountries().toPromise();

    for (const countryShort in countryObj) {
      if (Object.prototype.hasOwnProperty.call( countryObj, countryShort)) {
        countryList.push(
            {
              short: countryShort,
              english_name: countryObj[countryShort],
            });
      }
    }
    return countryList;
  }
}
