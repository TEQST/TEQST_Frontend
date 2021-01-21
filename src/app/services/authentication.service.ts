import {RegisterForm} from './../interfaces/register-form';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {AlertManagerService} from './alert-manager.service';
import {LanguageService} from './language.service';
import {User} from '../interfaces/user';
import {UsermgmtService} from './usermgmt.service';
import {Constants} from '../constants';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  SERVER_URL = Constants.SERVER_URL;
  private httpOptions;
  private dataFromServer: any = '';

  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    private alertService: AlertManagerService,
    public languageService: LanguageService,
    public usermgmtService: UsermgmtService,
    private route: ActivatedRoute) {

  }

  // login into Website, saving userdata in localStorage, redirect to speak tab
  // and fetching userdata from server
  login(dataToSend): void {
    const url = this.SERVER_URL + '/api/auth/login/';
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

          if (this.route.snapshot.queryParamMap.has('next')) {
            const nextURL = this.route.snapshot.queryParamMap.get('next');
            this.navCtrl.navigateForward(nextURL);
          } else {
            this.navCtrl.navigateForward('/tabs/speak');
          }
        }, (error: any) => {
          // calls AlertService when server sends error code
          this.alertService.showErrorAlertNoRedirection(
              'Wrong Input',
              'Invalid Password or Username');
        });
  }

  // creates a new User with the sended Data
  register2(dataToSend, logInData): void {
    const url = this.SERVER_URL + '/api/auth/register/';
    this.http.post(url, dataToSend).subscribe(() => {
      this.login(logInData);
    }, (error: any) => {
      this.alertService.showErrorAlertNoRedirection('Username already exists',
          'A user with that username already exists, please choose another username');
    });
  }

  register(registrationData: RegisterForm): Observable<object> {
    const url =this.SERVER_URL + '/api/auth/register/';
    return this.http.post(url, registrationData);
  }


  // redirect to login, and loging out
  logout(): void {
    const url = this.SERVER_URL + '/api/auth/logout/';
    this.http.post(url, '', this.httpOptions).subscribe(() => {
      /* reset the auth token manually
         because on back button press the page isn't refreshed */
      this.usermgmtService.deleteStoredUserData();
      this.usermgmtService.clearLoggingData();
      // this.navCtrl.navigateForward('/login');
      this.navCtrl.navigateRoot('/login');
    });
  }

  isLoggedIn(): boolean {
    // if no auth token is found in local storage AUTH_TOKEN = null
    return !(localStorage.getItem('Token') === null);
  }

}
