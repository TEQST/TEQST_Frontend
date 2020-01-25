import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FolderManageService {

  confolderor() { }

  getFolderInfo(folderId: string) {
    if (folderId == '010') {
      return {
        type: 'sharedFolder',
        name: 'folder 10'
      }
    }
    return {
      type: 'folder',
      name: 'name_for_id_'+folderId
    }
  }

  getSubfolderList(folderId: string) {
    switch (folderId) {
      case null:
        return [
          {
            id: '003',
            name: 'folder 3',
            type: 'folder'
          },
          {
            id: '004',
            name: 'folder 4',
            type: 'folder'
          },
          {
            id: '005',
            name: 'folder 5',
            type: 'folder'
          }
        ]
      case '005':
          return [
            {
              id: '007',
              name: 'folder 7',
              type: 'folder'
            },
            {
              id: '008',
              name: 'folder 8',
              type: 'folder'
            }
          ]
      case '008':
        return [
          {
            id: '009',
            name: 'folder 9',
            type: 'folder'
          },
          {
            id: '010',
            name: 'folder 10',
            type: 'sharedFolder'
          }
        ]
      default: return []
    }
  }

  getTextList(folderId: string) {
    switch (folderId) {
      case '010':
        return [
          {
            id: '4592',
            name: 'text 1'
          },
          {
            id: '6942',
            name: 'text 2'
          },
          {
            id: '5818',
            name: 'text 3'
          },
        ]
      default: return []
    }
  }

  getSpeakers(): String[] {
    let speakers = ["Alex", "Kevin", "Anna"];
    return speakers;
  }

  getAllUsers(): String[] {
    let users = ["Ariel", "Marcel", "Alex", "Kevin", "Anna", "Isabelle", "Charline", "Gertrud", "Franz"];
    return users;
  }
}
