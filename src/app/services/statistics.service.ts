import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Constants} from 'src/app/constants';
import {TextStats} from 'src/app/interfaces/text-stats';
import {FolderStats} from 'src/app/interfaces/folder-stats';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {

  SERVER_URL = Constants.SERVER_URL;

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService) { }

  public getSharedFolderStats(sharedFolderId: number, role: 'pub' | 'lstn')
  : Observable<FolderStats> {
    const url = this.SERVER_URL +
      `/api/${role}/sharedfolders/${sharedFolderId}/stats/`;
    return this.http.get<FolderStats>(url.toString());
  }

  public getTextStats(textId: number): Observable<TextStats> {
    const url = this.SERVER_URL + `/api/pub/texts/${textId}/stats/`;
    return this.http.get<TextStats>(url.toString());
  }

  public downloadstatistics(): Observable<Blob> {
    const url = this.SERVER_URL + `/api/pub/speakerstats/`;
    return this.http.get(url.toString(), {
      responseType: 'blob',
    });
  }

}
