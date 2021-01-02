import {Injectable} from '@angular/core';
import {ManageFolderService} from './manage-folder.service';

@Injectable({
  providedIn: 'root',
})
export class ShareFolderService {

  constructor(private folderService: ManageFolderService) { }

  async fetchUserLists(folderId) {
    // get a list of all users
    let allUsers;
    let speakers;
    let isPublicForAll;
    await this.folderService.getAllUsers()
        .toPromise()
        .then((userArray) => {
          allUsers = userArray;
        });
    // get a list of all speakers of the folder
    await this.folderService.getSharingInfo(folderId)
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
