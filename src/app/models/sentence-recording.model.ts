export class SentenceRecordingModel {
    constructor(
        public recordingId: number,
        public sentenceNumber: number, // index starting at 1
        public audioBlob: Blob
    ) {}
}
