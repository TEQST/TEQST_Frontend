export interface FolderStats {
    id: number;
    name: string;
    speakers: StatsPerSpeaker[];
}

// sub interfaces for cleaner formatting
export interface StatsPerSpeaker {
    name: string;
    completedTextsCount?: number,
    rec_time_without_rep: number,
    rec_time_with_rep: number,
    texts: StatsPerText[];
}

export interface StatsPerText {
    title: string;
    finished: number;
    total: number;
    rec_time_without_rep: number,
    rec_time_with_rep: number
}
