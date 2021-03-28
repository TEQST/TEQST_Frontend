import {TimeStats} from './time-stats';


export interface SharedFolder {
    id: number;
    name: string;
    owner: number;
    path: string;
    timestats: TimeStats;
    texts: SharedFolderText[];
}

interface SharedFolderText {
    id: number;
    title: string;
}
