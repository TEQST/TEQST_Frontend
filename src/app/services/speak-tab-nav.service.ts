import {SharedFolder} from './../interfaces/shared-folder';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import { Constants } from '../constants';


@Injectable({
  providedIn: 'root',
})

export class SpeakTabNavService {

  SERVER_URL = Constants.SERVER_URL;
  
  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService) { }

  getPublisherList() {
    const url = this.SERVER_URL + '/api/publishers/';

    return this.http.get(url);
  }

  getInfoForPublisher(publisherId: string) {
    const url =  this.SERVER_URL + `/api/publishers/${publisherId}/`;

    return this.http.get(url);
  }

  getInfoForSharedfolder(folderId: string) {
    const url = this.SERVER_URL + `/api/spk/sharedfolders/${folderId}/`;

    return this.http.get<SharedFolder>(url);
  }
}
