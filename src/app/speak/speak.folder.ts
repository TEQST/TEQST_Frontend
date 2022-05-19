import {Observable} from 'rxjs';

export class Folder {

    name: string
    uid: string

    // static setServiceProvider(folderService): void {
    //   this.folderService = folderService;
    // }

    constructor(uid, name) {
      this.name = name;
      this.uid = uid;
    }

    // getSubfolderList(): Observable<object> {
    //   return Folder.folderService.getSubfolderListFor(this.id);
    // }
}
