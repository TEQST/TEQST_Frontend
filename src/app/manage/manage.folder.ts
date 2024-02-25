import {Observable} from 'rxjs';

import {ManageFolderService} from 'src/app/services/manage-folder.service';

export class Folder {
    static folderService: ManageFolderService

    id: string
    uid: string
    dlpath: string
    name: string
    is_sharedfolder: boolean

    static setServiceProvider(folderService): void {
      this.folderService = folderService;
    }

    constructor(id, uid, dlpath, name, is_sharedFolder) {
      this.id = id;
      this.uid = uid;
      this.dlpath = dlpath;
      this.name = name;
      this.is_sharedfolder = is_sharedFolder;
    }

    getSubfolderList(): Observable<object> {
      return Folder.folderService.getSubfolderListFor(this.id);
    }

    createSubfolder(name): Observable<object> {
      return Folder.folderService.createFolder(this.id, name);
    }

    delete(): Observable<object> {
      return Folder.folderService.deleteFolder(this.id);
    }
}
