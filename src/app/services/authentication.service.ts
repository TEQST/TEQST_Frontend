import { RegisterForm } from './../interfaces/register-form';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {AlertManagerService} from './alert-manager.service';
import {LanguageService} from './language.service';
import {User} from '../interfaces/user';
import {UsermgmtService} from './usermgmt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private httpOptions;
  private dataFromServer: any = '';

  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    private alertService: AlertManagerService,
    public languageService: LanguageService,
    public usermgmtService: UsermgmtService) {

  }

  // login into Website, saving userdata in localStorage, redirect to speak tab
  // and fetching userdata from server
  login(dataToSend): void {
    const url = '/api/auth/login/';
    let menuLanguage;
    this.http.post(url, dataToSend, this.httpOptions)
        .subscribe((loginResponse: object) => {
          const userData = loginResponse['user'] as User;
          this.usermgmtService.initLoggingData(userData.id, userData.username);
          this.usermgmtService.isPublisher.next(userData.is_publisher);
          menuLanguage = userData.menu_language.short;
          this.languageService.updateMenuLanguage(menuLanguage);
          this.dataFromServer = JSON.stringify(loginResponse);
          localStorage.setItem(
              'Token',
              'Token ' + JSON.parse(this.dataFromServer).token);
          this.usermgmtService.storeUserData(userData);
          this.languageService
              .setMenuLanguage(this.languageService.menuLanguage);
          this.navCtrl.navigateForward('/tabs/speak');
        }, (error: any) => {
          // calls AlertService when server sends error code
          this.alertService.showErrorAlertNoRedirection(
              'Wrong Input',
              'Invalid Password or Username');
        });
  }

  // creates a new User with the sended Data
  register2(dataToSend, logInData): void {
    const url = '/api/auth/register/';
    this.http.post(url, dataToSend).subscribe(() => {
      this.login(logInData);
    }, (error: any) => {
      this.alertService.showErrorAlertNoRedirection('Username already exists',
       'A user with that username already exists, please choose another username');
    });
  }

  register(registrationData: RegisterForm): Observable<object> {
    const url = '/api/auth/register/';
    return this.http.post(url, registrationData);
  }


  // redirect to login, and loging out
  logout(): void {
    const url = '/api/auth/logout/';
    this.http.post(url, '', this.httpOptions).subscribe(() => {
      /* reset the auth token manually
         because on back button press the page isn't refreshed */
      this.usermgmtService.deleteStoredUserData();
      this.usermgmtService.clearLoggingData();
      this.navCtrl.navigateForward('/login');
    });
  }

  isLoggedIn(): boolean {
    // if no auth token is found in local storage AUTH_TOKEN = null
    return !(localStorage.getItem('Token') === null);
  }

}
