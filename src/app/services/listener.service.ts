import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../constants';
import {AuthenticationService} from './authentication.service';
import {User} from '../interfaces/user';
import {SharedFolder} from './../interfaces/shared-folder';
import {Observable, Subject} from 'rxjs';
import {AlertManagerService} from './alert-manager.service';
import { TextObject } from '../interfaces/text-object';
import { TextStats } from '../interfaces/text-stats';

@Injectable({
  providedIn: 'root',
})
export class ListenerService {

  SERVER_URL = Constants.SERVER_URL;
  public requestMade = new Subject<any>();
  public sharedTextsList = new Subject<any>()

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService,
    private alertService: AlertManagerService) { }

  getPublisherList() {
    this.requestMade.next(true);
    const url =
      this.SERVER_URL + `/api/lstn/publishers/`;
    return this.http.get<JSON[]>(url);
  }

  getFoldersOfPublisher(publisherId) {
    this.requestMade.next(true);
    const url =
      this.SERVER_URL + `/api/lstn/publishers/${publisherId}/`;
    return this.http.get<JSON[]>(url);
  }

  loadContentsOfSharedFolder(folderId: string) {
    this.requestMade.next(true);
    const url = this.SERVER_URL + `/api/lstn/sharedfolders/${folderId}/texts/`;

    return this.http.get<SharedFolder>(url).subscribe(
        (data) => {
          this.sharedTextsList.next(data);
        },
        (err) => this.alertService
            .showErrorAlert(err.status, err.statusText),
    );
  }

  getTextInfo(textId) {
    this.requestMade.next(true);
    const url =
      this.SERVER_URL + `/api/lstn/texts/${textId}/`;
    return this.http.get<TextObject>(url);
  }

  public getTextStats(textId: number): Observable<TextStats> {
    this.requestMade.next(true);
    const url = this.SERVER_URL + `/api/lstn/texts/${textId}/stats/`;
    return this.http.get<TextStats>(url.toString());
  }
}
