export interface FolderStats {

    id: number;
    name: string;
    speakers: StatsPerSpeaker[];
}

// sub interfaces for cleaner formatting
interface StatsPerSpeaker {
    name: string;
    completedTextsCount?: number
    texts: StatsPerText[];
}

interface StatsPerText {
    title: string;
    finished: number;
    total: number;
}
