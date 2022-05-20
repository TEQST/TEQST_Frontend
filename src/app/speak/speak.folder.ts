import {Observable} from 'rxjs';

export class Folder {

    name: string
    uid: string
    parent: number

    // static setServiceProvider(folderService): void {
    //   this.folderService = folderService;
    // }

    constructor(uid, name, parent) {
      this.name = name;
      this.uid = uid;
      this.parent = parent;
    }

    // getSubfolderList(): Observable<object> {
    //   return Folder.folderService.getSubfolderListFor(this.id);
    // }
}
