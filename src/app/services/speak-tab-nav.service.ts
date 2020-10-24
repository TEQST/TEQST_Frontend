import {SharedFolder} from './../interfaces/shared-folder';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../constants';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root',
})

export class SpeakTabNavService {

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService) { }

  getPublisherList() {
    const url = '/api/publishers/';

    return this.http.get(url);
  }

  getInfoForPublisher(publisherId: string) {
    const url =  `/api/publishers/${publisherId}/`;

    return this.http.get(url);
  }

  getInfoForSharedfolder(folderId: string) {
    const url = `/api/spk/sharedfolders/${folderId}/`;

    return this.http.get<SharedFolder>(url);
  }
}
