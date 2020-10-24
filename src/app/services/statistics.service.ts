import {TextStats} from './../interfaces/text-stats';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FolderStats} from '../interfaces/folder-stats';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService) { }


  public getSharedFolderStats(sharedFolderId: number): Observable<FolderStats> {
    const url = `/api/pub/sharedfolders/${sharedFolderId}/stats/`;
    return this.http.get<FolderStats>(url.toString());
  }

  public getTextStats(textId: number): Observable<TextStats> {
    const url = `/api/pub/texts/${textId}/stats/`;
    return this.http.get<TextStats>(url.toString());
  }

}
