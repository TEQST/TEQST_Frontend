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
   private httpOptions;
   public isPublisher = new BehaviorSubject<boolean>(undefined);
  
  // tslint:disable: no-string-literal

  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    private alertService: AlertManagerService,
    public languageService: LanguageService,
    private injector: Injector) {}


  // notifys the Server about profile changes
  updateProfile(dataToSend) {
    const url = this.SERVER_URL + '/api/user/';
    return this.http.put(url, dataToSend);
  }

  patchProfile(dataToSend) {
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
  loadContent(): Observable<ArrayBuffer> {
    const url = this.SERVER_URL + '/api/user/';
    return this.http.get(url, this.httpOptions);
  }

  storeUserData(userData: User): void {
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

  // add user id and username to the error logging
  public initLoggingData(id: number, username: string): void {
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

  public clearLoggingData(): void {
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
