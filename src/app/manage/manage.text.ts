import { ManageFolderService } from 'src/app/services/manage-folder.service';

export class Text {
    static folderService: ManageFolderService

    id: string
    title: string

    static setServiceProvider(folderService) {
        this.folderService = folderService
    }

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    delete() {
        return Text.folderService.deleteText(this.id)
    }
}