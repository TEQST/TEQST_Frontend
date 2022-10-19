import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {Constants} from 'src/app/constants';
import {TextObject} from 'src/app/interfaces/text-object';
import {TextStats} from 'src/app/interfaces/text-stats';
import {FolderDetail} from 'src/app/interfaces/folder-detail';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ListenerService {

  SERVER_URL = Constants.SERVER_URL;
  public requestMade = new Subject<any>();
  public sharedTextsList = new Subject<any>()

  constructor(
    public authenticationService: AuthenticationService,
    private http: HttpClient) { }


  getSharedFolders(): Observable<JSON[]> {
    this.requestMade.next(true);
    const url =
      this.SERVER_URL + `/api/lstn/folders`;
    return this.http.get<JSON[]>(url);
  }

  getFolderDetail(folderId: string): Observable<FolderDetail> {
    this.requestMade.next(true);
    const url =
      this.SERVER_URL + `/api/lstn/folders/${folderId}/`;
    return this.http.get<FolderDetail>(url);
  }

  loadContentsOfSharedFolder(folderId: string): Observable<JSON> {
    this.requestMade.next(true);
    const url = this.SERVER_URL + `/api/lstn/sharedfolders/${folderId}/texts/`;
    return this.http.get<JSON>(url);
  }

  getTextInfo(textId): Observable<TextObject> {
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
