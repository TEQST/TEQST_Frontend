import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Constants} from '../constants';
import {AuthenticationService} from './authentication.service';
import {User} from '../interfaces/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareFolderService {

  SERVER_URL = Constants.SERVER_URL;

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService) { }


  getSharingSpeakers(sharedfolderId: number): Observable<JSON[]> {
    const url =
      this.SERVER_URL + `/api/sharedfolders/${sharedfolderId}/`;
    return this.http.get<JSON[]>(url);
  }

  setSharingSpeakers(
      sharedfolderId: number,
      speakers: number[],
      public_for_all: boolean): Observable<JSON> {

    const url = this.SERVER_URL + `/api/sharedfolders/${sharedfolderId}/`;
    return this.http.put<JSON>(url, {
      speaker_ids: speakers,
      public: public_for_all,
    });
  }

  getSharingListeners(sharedfolderId: number): Observable<JSON[]> {
    const url =
      this.SERVER_URL + `/api/pub/sharedfolders/${sharedfolderId}/listeners`;
    return this.http.get<JSON[]>(url);
  }

  setSharingListeners(
      sharedfolderId: number,
      listeners: number[]): Observable<JSON> {

    const url = this.SERVER_URL +
      `/api/pub/sharedfolders/${sharedfolderId}/listeners/`;
    return this.http.put<JSON>(url, {
      listener_ids: listeners,
    });
  }

  getAllUsers(): Observable<User[]> {
    const url = this.SERVER_URL + `/api/users/`;
    return this.http.get<User[]>(url);
  }

  filterLists(list, allUsers, searchTerm)
  :{filteredList: User[]; filteredUsers: User[]} {
    const filteredList = list.filter((user) => {
      return user.username.toLowerCase()
          .startsWith(searchTerm.toLowerCase());
    });
    const filteredUsers = allUsers.filter((user) => {
      if (user.username.toLowerCase()
          .startsWith(searchTerm.toLowerCase())) {
        // remove all users already listed in the first list
        return filteredList
            .findIndex((speaker) => speaker.username === user.username) === -1;
      }
      return false;
    });
    return {filteredList, filteredUsers};
  }

}
