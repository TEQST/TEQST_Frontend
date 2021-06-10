import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../constants';
import {AuthenticationService} from './authentication.service';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ListenerService {

  SERVER_URL = Constants.SERVER_URL;

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService) { }

  getPublishers() {
    const url =
      this.SERVER_URL + `/api/lstn/publishers/`;
    return this.http.get<JSON[]>(url);
  }
}
