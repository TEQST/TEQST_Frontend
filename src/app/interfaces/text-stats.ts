export interface TextStats {
    id: number;
    title: String;
    total: number;
    speakers: statsPerSpeaker[];
}

interface statsPerSpeaker {
    name: String;
    finished: number;
    textrecording_id: number;
}
