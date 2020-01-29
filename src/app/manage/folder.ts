import { ManageFolderService } from 'src/app/services/manage-folder.service';

export class Folder {
    static folderService: ManageFolderService

    id: string
    name: string
    is_sharedfolder: boolean

    static setServiceProvider(folderService) {
        this.folderService = folderService
    }

    constructor(id, name, is_sharedFolder) {
        this.id = id;
        this.name = name;
        this.is_sharedfolder = is_sharedFolder;
    }

    getSubfolderList() {
        return Folder.folderService.getSubfolderListFor(this.id)
    }

    createSubfolder(name) {
        return Folder.folderService.createFolder(this.id, name)
    }

    delete() {
        return Folder.folderService.deleteFolder(this.id)
    }
}