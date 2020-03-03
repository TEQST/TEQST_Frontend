import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Constants } from '../constants';
import { BehaviorSubject } from 'rxjs';
import { AlertManagerService } from './alert-manager.service';
import { ConditionalExpr } from '@angular/compiler';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})


export class UsermgmtService {

  SERVER_URL = Constants.SERVER_URL;

  private dataFromServer: any = '';

  private httpOptions;
  private ispublisher: boolean;
  private menuLanguage = 'en'; // TODO: fetch menu language from server

  private AUTH_TOKEN = new BehaviorSubject<string>('');

  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    private alertService: AlertManagerService,
    private translate: TranslateService) {

    // gets AuthToken after reload or on init
    this.getAuthToken();
    this.initHeaders();
   }



   // login into Website, saving AuthToken local and in localStorage, redirect to speak tab
  login(dataToSend) {
    const url = this.SERVER_URL +  '/api/auth/login/';
    const user = 'user';
    const isPublissherServerAnswer = 'is_publisher';
    this.reset();
    this.http.post(url, dataToSend, this.httpOptions).subscribe((dataReturnFromServer: object) => {
      this.ispublisher = dataReturnFromServer[user][isPublissherServerAnswer];
      this.dataFromServer = JSON.stringify(dataReturnFromServer);

      this.AUTH_TOKEN.next('Token ' + JSON.parse(this.dataFromServer).token);
      this.initHeaders();
      localStorage.setItem('Token', this.AUTH_TOKEN.getValue());
      localStorage.setItem('is_Publisher', JSON.stringify(this.ispublisher));

      this.navCtrl.navigateForward('speak');
      }, (error: any) => {
        // calls AlertService when server sends error code
        this.alertService.showErrorAlertNoRedirection('Wrong Input', 'Invalid Password or Username');
      });
  }

  // creates a new User with the sended Data
  register(dataToSend, logInData) {
    const url = this.SERVER_URL + '/api/auth/register/';
    this.http.post(url, dataToSend).subscribe(() => {
      this.login(logInData);
    });
  }

  // notifys the Server about profile changes
  updateProfile(dataToSend) {
    const url = this.SERVER_URL + '/api/user/';
    return this.http.put(url, dataToSend, this.httpOptions);
  }

  // redirect to login, and loging out
  logout() {
    const url = this.SERVER_URL + '/api/auth/logout/';
    this.http.post(url, '', this.httpOptions).subscribe(() => {
      this.reset();
      localStorage.clear();
      this.navCtrl.navigateForward('login');

    });
  }

  deleteAuthToken(): void {
    localStorage.clear();
    this.AUTH_TOKEN.next(null);
  }

  // gets all the information about the User who is currently logged in
  loadContent() {
    const url = this.SERVER_URL + '/api/user/';
    return this.http.get(url, this.httpOptions);
  }

  // returns all speakable Languages created by an admin
  getLangs() {
    const url = this.SERVER_URL + '/api/langs/';
    return this.http.get(url);
  }
  // resets httpOptions -> no Authtoken after reset
  private reset() {
    // reset the auth token manually because on back button press page isn't refreshed
    this.deleteAuthToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'authtoken'
      })
    };
  }

// add AuthToken to httpOptions
  private initHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: this.AUTH_TOKEN.getValue(),
      })
    };
  }
  // returns boolean if a user is a Publisher
  getIsPublisher() {
    this.ispublisher = JSON.parse(localStorage.getItem('is_Publisher'));
    return this.ispublisher;
  }
  // gets the authToken.
  getAuthToken() {
    this.AUTH_TOKEN.next(localStorage.getItem('Token'));
    return this.AUTH_TOKEN.asObservable();
  }

  setMenuLanguage(lang: string): void {
    this.menuLanguage = lang;
    this.translate.use(lang);
  }

  getMenuLanguage(): string {
    return this.menuLanguage;
  }

  isLoggedIn(): boolean {
    // if no auth token is found in local storage AUTH_TOKEN = null
    return !(this.AUTH_TOKEN.getValue() === null);
  }

}
