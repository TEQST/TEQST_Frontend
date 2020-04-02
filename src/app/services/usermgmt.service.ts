import { User } from './../interfaces/user';
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Constants } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertManagerService } from './alert-manager.service';
import { RollbarService } from '../rollbar';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})


export class UsermgmtService {

  SERVER_URL = Constants.SERVER_URL;

  private dataFromServer: any = '';

  private httpOptions;
  private isPublisher = new BehaviorSubject<boolean>(undefined);
  private AUTH_TOKEN = new BehaviorSubject<string>('');
  // tslint:disable: no-string-literal

  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    private alertService: AlertManagerService,
    public languageService: LanguageService,
    private injector: Injector) {

    // gets AuthToken after reload or on init
    this.getAuthToken();
    this.initHeaders();

   }

   // login into Website, saving userdata in localStorage, redirect to speak tab
   // and fetching userdata from server
  login(dataToSend): void {
    const url = this.SERVER_URL +  '/api/auth/login/';
    let menuLanguage;
    this.resetHttpOptions();
    this.http.post(url, dataToSend, this.httpOptions).subscribe((loginResponse: object) => {
      const userData = loginResponse['user'] as User;
      this.initLoggingData(userData.id, userData.username);
      this.isPublisher.next(userData.is_publisher);
      menuLanguage = userData.menu_language.short;
      this.languageService.updateMenuLanguage(menuLanguage);
      this.dataFromServer = JSON.stringify(loginResponse);
      this.AUTH_TOKEN.next('Token ' + JSON.parse(this.dataFromServer).token);
      this.initHeaders();
      this.storeUserData(userData);
      this.languageService.setMenuLanguage(this.languageService.menuLanguage);
      this.navCtrl.navigateForward('speak');
      }, (error: any) => {
        // calls AlertService when server sends error code
        this.alertService.showErrorAlertNoRedirection('Wrong Input', 'Invalid Password or Username');
      });
  }

  // creates a new User with the sended Data
  register(dataToSend, logInData): void {
    const url = this.SERVER_URL + '/api/auth/register/';
    this.http.post(url, dataToSend).subscribe(() => {
      this.login(logInData);
    }, (error: any) => {
      this.alertService.showErrorAlertNoRedirection('Username already eists',
       'A user with that username already exists, please choose another username');
    });
  }

  // notifys the Server about profile changes
  updateProfile(dataToSend) {
    const url = this.SERVER_URL + '/api/user/';
    return this.http.put(url, dataToSend, this.httpOptions);
  }

  patchProfile(dataToSend) {
    const url = this.SERVER_URL + '/api/user/';
    return this.http.patch(url, dataToSend, this.httpOptions);
  }

  // redirect to login, and loging out
  logout(): void {
    const url = this.SERVER_URL + '/api/auth/logout/';
    this.http.post(url, '', this.httpOptions).subscribe(() => {
      this.resetHttpOptions();
      // reset the auth token manually because on back button press page isn't refreshed
      this.deleteStoredUserData();
      this.clearLoggingData();
      this.navCtrl.navigateForward('/login');

    });
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
    this.AUTH_TOKEN.next(null);
  }

  // gets all the information about the User who is currently logged in
  loadContent(): Observable<ArrayBuffer> {
    const url = this.SERVER_URL + '/api/user/';
    return this.http.get(url, this.httpOptions);
  }

  // resets httpOptions -> no Authtoken after reset
  private resetHttpOptions(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'authtoken'
      })
    };
  }

// add AuthToken to httpOptions
  private initHeaders(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: this.AUTH_TOKEN.getValue(),
      })
    };
  }

  storeUserData(userData: User): void {
    localStorage.setItem('Token', this.AUTH_TOKEN.getValue());
    this.languageService.putMenuLanguageLocalStorage(),
    localStorage.setItem('isPublisher', JSON.stringify(this.isPublisher.getValue()));
    localStorage.setItem('userId', userData.id.toString());
    localStorage.setItem('username', userData.username);
  }
  // returns boolean if a user is a Publisher
  getIsPublisher(): Observable<boolean> {
    this.isPublisher.next(JSON.parse(localStorage.getItem('isPublisher')));
    return this.isPublisher.asObservable();
  }
  // gets the authToken.
  getAuthToken(): Observable<string> {
    this.AUTH_TOKEN.next(localStorage.getItem('Token'));
    return this.AUTH_TOKEN.asObservable();
  }

  isLoggedIn(): boolean {
    // if no auth token is found in local storage AUTH_TOKEN = null
    return !(this.AUTH_TOKEN.getValue() === null);
  }

  // add user id and username to the error logging
  private initLoggingData(id: number, username: string): void {
    const rollbar = this.injector.get(RollbarService);
    rollbar.configure({
      payload: {
        person: {
          id,
          username
        }
      }
    });
  }

  private clearLoggingData(): void {
    const rollbar = this.injector.get(RollbarService);
    rollbar.configure({
      payload: {
        person: {
          id: null,
          username: null
        }
      }
    });
  }
}
