import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AlertManagerService } from './alert-manager.service';
import { LanguageService } from './language.service';
import { Constants } from '../constants';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsermgmtService } from './usermgmt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  SERVER_URL = Constants.SERVER_URL;
  private httpOptions;
  private dataFromServer: any = '';
  private AUTH_TOKEN = new BehaviorSubject<string>('');

  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    private alertService: AlertManagerService,
    public languageService: LanguageService,
    public usermgmtService: UsermgmtService) {
      // gets AuthToken after reload or on init
      this.getAuthToken();
      this.usermgmtService.setAuthToken(this.AUTH_TOKEN.getValue());
      this.initHeadersCollection();
    }

   // login into Website, saving userdata in localStorage, redirect to speak tab
   // and fetching userdata from server
    // tslint:disable: no-string-literal
    login(dataToSend): void {
      const url = this.SERVER_URL +  '/api/auth/login/';
      let menuLanguage;
      this.resetHttpOptions();
      this.http.post(url, dataToSend, this.httpOptions).subscribe((loginResponse: object) => {
        const userData = loginResponse['user'] as User;
        this.usermgmtService.initLoggingData(userData.id, userData.username);
        this.usermgmtService.isPublisher.next(userData.is_publisher);
        menuLanguage = userData.menu_language.short;
        this.languageService.updateMenuLanguage(menuLanguage);
        this.dataFromServer = JSON.stringify(loginResponse);
        this.AUTH_TOKEN.next('Token ' + JSON.parse(this.dataFromServer).token);
        this.usermgmtService.setAuthToken(this.AUTH_TOKEN.getValue());
        this.initHeadersCollection();
        this.usermgmtService.storeUserData(userData);
        this.languageService.setMenuLanguage(this.languageService.menuLanguage);
        this.navCtrl.navigateForward('speak');
      },  (error: any) => {
        // calls AlertService when server sends error code
        this.alertService.showErrorAlertNoRedirection('Wrong Input', 'Invalid Password or Username');
      });
    }
    private initHeadersCollection() {
      this.initHeaders();
      this.usermgmtService.initHeaders();
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

  // gets the authToken.
  getAuthToken(): Observable<string> {
    this.AUTH_TOKEN.next(localStorage.getItem('Token'));
    return this.AUTH_TOKEN.asObservable();
  }

  // redirect to login, and loging out
  logout(): void {
    const url = this.SERVER_URL + '/api/auth/logout/';
    this.http.post(url, '', this.httpOptions).subscribe(() => {
      this.resetHttpOptions();
      // reset the auth token manually because on back button press page isn't refreshed
      this.usermgmtService.deleteStoredUserData();
      this.usermgmtService.clearLoggingData();
      this.navCtrl.navigateForward('/login');
    });
  }

}
