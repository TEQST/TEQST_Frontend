import {FolderBasic} from './folder-basic';

export interface FolderDetail {
    id: number;
    name: string;
    owner: number;
    parent: number;
    subfolder: FolderBasic[];
    is_sharedfolder: boolean;
}
