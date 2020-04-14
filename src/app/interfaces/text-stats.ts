export interface TextStats {
    id: number;
    title: string;
    total: number;
    speakers: StatsPerSpeaker[];
}

interface StatsPerSpeaker {
    name: string;
    finished: number;
    textrecording_id: number;
}
