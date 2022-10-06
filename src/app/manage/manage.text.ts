import {Observable} from 'rxjs';

import {ManageFolderService} from 'src/app/services/manage-folder.service';

export class Text {
    static folderService: ManageFolderService

    id: string
    title: string
    content: string

    static setServiceProvider(folderService): void {
      this.folderService = folderService;
    }

    constructor(id, title, content='') {
      this.id = id;
      this.title = title;
      this.content = content;
    }

    delete(): Observable<object> {
      return Text.folderService.deleteText(this.id);
    }
}
