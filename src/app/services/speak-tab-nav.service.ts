import {SharedFolder} from './../interfaces/shared-folder';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Subject} from 'rxjs';
import {AlertManagerService} from './alert-manager.service';
import { Constants } from '../constants';


@Injectable({
  providedIn: 'root',
})

export class SpeakTabNavService {

public sharedFoldersList = new Subject<any>()

  SERVER_URL = Constants.SERVER_URL;
  
  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService,
    private alertService: AlertManagerService) { }

getPublisherList() {
  const url = '/api/publishers/';
  return this.http.get(url);
}

getInfoForPublisher(publisherId: string) {
  const url = `/api/publishers/${publisherId}/`;
  return this.http.get(url);
}

getPublicFolders() {
  const url = '/api/spk/publicfolders/';
  return this.http.get(url);
}

loadContentsOfSharedFolder(folderId: string) {
  const url = `/api/spk/sharedfolders/${folderId}/`;

  return this.http.get<SharedFolder>(url).subscribe(
      (data) => {
        this.sharedFoldersList.next(data);
      },
      (err) => this.alertService
          .showErrorAlert(err.status, err.statusText),
  );
}
  getInfoForSharedfolder(folderId: string) {
    const url = this.SERVER_URL + `/api/spk/sharedfolders/${folderId}/`;

}
}