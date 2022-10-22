import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

import {RegisterForm} from 'src/app/interfaces/register-form';
import {User} from 'src/app/interfaces/user';
import {Constants} from 'src/app/constants';
import {AlertManagerService} from './alert-manager.service';
import {LanguageService} from './language.service';
import {UsermgmtService} from './usermgmt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  SERVER_URL = Constants.SERVER_URL;
  private httpOptions;
  private dataFromServer: any = '';

  constructor(public http: HttpClient,
              public navCtrl: NavController,
              public languageService: LanguageService,
              public usermgmtService: UsermgmtService,
              private alertService: AlertManagerService,
              private route: ActivatedRoute) {}

  // login into Website, saving userdata in localStorage, redirect to speak tab
  // and fetching userdata from server
  login(dataToSend): void {
    const url = this.SERVER_URL + '/api/auth/login/';
    let menuLanguage;
    this.http.post(url, dataToSend, this.httpOptions)
        .subscribe((loginResponse: object) => {

          // set variables based on received data
          const userData = loginResponse['user'] as User;
          this.usermgmtService.initLoggingData(userData.id, userData.username);
          this.usermgmtService.isPublisher.next(userData.is_publisher);
          this.usermgmtService.isListener.next(userData.is_listener);
          menuLanguage = userData.menu_language.short;
          this.languageService.updateMenuLanguage(menuLanguage);
          this.dataFromServer = JSON.stringify(loginResponse);
          localStorage.setItem(
              'Token',
              'Token ' + JSON.parse(this.dataFromServer).token);
          this.usermgmtService.storeUserData(userData);
          this.languageService
              .setMenuLanguage(this.languageService.menuLanguage);

          // redirect user
          if (this.route.snapshot.queryParamMap.has('next')) {
            const nextURL = this.route.snapshot.queryParamMap.get('next');
            this.navCtrl.navigateForward(nextURL);
          } else {
            this.navCtrl.navigateForward('/tabs/speak');
          }
        }, () => {
          // calls AlertService when server sends error code
          // This effectively never gets called since the Backend responds
          // with a 401 status code which is handled by the interceptor.
          this.alertService.showErrorAlertNoRedirection(
              'Wrong Input',
              'Invalid Password or Username');
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
