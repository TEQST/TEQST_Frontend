import {SharedFolder} from './../interfaces/shared-folder';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Constants} from '../constants';
import {Subject} from 'rxjs';
import {AlertManagerService} from './alert-manager.service';


@Injectable({
  providedIn: 'root',
})

export class SpeakTabNavService {

SERVER_URL = Constants.SERVER_URL;
public sharedTextsList = new Subject<any>()
public requestMade = new Subject<any>();

constructor(
  private http: HttpClient,
  public authenticationService: AuthenticationService,
  private alertService: AlertManagerService) { }

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

loadContentsOfSharedFolder(folderId: string) {
  this.requestMade.next(true);
  const url = this.SERVER_URL + `/api/spk/sharedfolders/${folderId}/`;

  return this.http.get<SharedFolder>(url).subscribe(
      (data) => {
        this.sharedTextsList.next(data);
      },
      (err) => this.alertService
          .showErrorAlert(err.status, err.statusText),
  );
}
getInfoForSharedfolder(folderId: string) {
  const url = this.SERVER_URL + `/api/spk/sharedfolders/${folderId}/`;

}
}
