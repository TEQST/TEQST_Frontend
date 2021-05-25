import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../constants';
import {AuthenticationService} from './authentication.service';
import {User} from '../interfaces/user';


@Injectable({
  providedIn: 'root',
})
export class ShareFolderService {

  SERVER_URL = Constants.SERVER_URL;

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService) { }


  getSharingSpeakers(sharedfolderId: number) {
    const url =
      this.SERVER_URL + `/api/sharedfolders/${sharedfolderId}/`;
    return this.http.get<JSON[]>(url);
  }

  setSharingSpeakers(
      sharedfolderId: number,
      speakers: number[],
      public_for_all: boolean) {

    const url = this.SERVER_URL + `/api/sharedfolders/${sharedfolderId}/`;
    return this.http.put<JSON>(url, {
      speaker_ids: speakers,
      public: public_for_all,
    });
  }

  getSharingListeners(sharedfolderId: number) {
    const url =
      this.SERVER_URL + `/api/sharedfolders/${sharedfolderId}/listeners`;
    return this.http.get<JSON[]>(url);
  }

  setSharingListeners(
      sharedfolderId: number,
      listeners: number[]) {

    const url = this.SERVER_URL +
      `/api/sharedfolders/${sharedfolderId}/listeners`;
    return this.http.put<JSON>(url, {
      listener_ids: listeners,
    });
  }

  getAllUsers() {
    const url = this.SERVER_URL + `/api/users/`;
    return this.http.get<User[]>(url);
  }

  async fetchUserLists(folderId) {
    // get a list of all users
    let allUsers;
    let speakers;
    let isPublicForAll;
    await this.getAllUsers()
        .toPromise()
        .then((userArray) => {
          allUsers = userArray;
        });
    // get a list of all speakers of the folder
    await this.getSharingSpeakers(folderId)
        .toPromise()
        .then((sharedFolder) => {
          speakers = sharedFolder['speakers'];
          isPublicForAll = sharedFolder['public'];
        });
    return {allUsers, speakers, isPublicForAll};
  }

  filterLists(list, allUsers, searchTerm) {
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
