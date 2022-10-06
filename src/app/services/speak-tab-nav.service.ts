import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

import {Constants} from 'src/app/constants';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root',
})

export class SpeakTabNavService {

SERVER_URL = Constants.SERVER_URL;
public sharedTextsList = new Subject<any>()
public requestMade = new Subject<any>();

constructor(
  private http: HttpClient,
  public authenticationService: AuthenticationService) { }

getFolderInfo(id, root_uid) {
  this.requestMade.next(true);
  const url = this.SERVER_URL + `/api/spk/folders/${id}/?root=${root_uid}`;
  return this.http.get(url);
}

getPublisherList() {
  this.requestMade.next(true);
  const url = this.SERVER_URL + '/api/publishers/';
  return this.http.get(url);
}

getInfoForPublisher(publisherId: string) {
  this.requestMade.next(true);
  const url = this.SERVER_URL + `/api/publishers/${publisherId}/`;
  return this.http.get(url);
}

getPublicFolders() {
  this.requestMade.next(true);
  const url = this.SERVER_URL + '/api/spk/publicfolders/';
  return this.http.get(url);
}

loadContentsOfSharedFolder(folderId: string, root_id: string) {
  this.requestMade.next(true);
  const url = this.SERVER_URL +
      `/api/spk/sharedfolders/${folderId}/?root=${root_id}`;
  return this.http.get(url);
}

}
