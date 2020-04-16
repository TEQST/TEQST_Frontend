import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';
import { UsermgmtService } from './usermgmt.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class SpeakTabNavService {

  constructor(private http: HttpClient, public authenticationService: AuthenticationService) {
    this.authenticationService.getAuthToken().subscribe((token) => this.AUTH_TOKEN = token);
  }

  SERVER_URL = Constants.SERVER_URL;
  AUTH_TOKEN: string;

  getPublisherList() {
    const urlStr = this.SERVER_URL + '/api/publishers/';
    const url = new URL(urlStr);

    return this.http.get(url.toString(), {
      headers:  {
        Authorization: this.AUTH_TOKEN
      }
    });
  }

  getInfoForPublisher(publisherId: string) {
    const url = new URL(this.SERVER_URL + '/api/publishers/' + publisherId + '/');

    return this.http.get(url.toString(), {
      headers:  {
        Authorization: this.AUTH_TOKEN
      }
    });
  }

  getInfoForSharedfolder(folderId: string) {
    const url = new URL(this.SERVER_URL + '/api/spk/sharedfolders/' + folderId + '/');

    return this.http.get(url.toString(), {
      headers:  {
        Authorization: this.AUTH_TOKEN
      }
    });
  }
}
