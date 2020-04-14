import { BehaviorSubject, Observable } from 'rxjs';
export class RecordingStateModel {
    private furthestSentenceIndex = new BehaviorSubject<number>(0);
    private activeSentenceIndex = new BehaviorSubject<number>(0);
    private sentenceHasRecording = new BehaviorSubject<boolean>(false);
    private totalSentenceCount = 0;

    constructor(furthestSentenceIndex: number, totalSentenceCount: number) {
        this.furthestSentenceIndex.next(furthestSentenceIndex);
        this.activeSentenceIndex.next(furthestSentenceIndex);
        this.totalSentenceCount = totalSentenceCount;
        this.checkRecordingStatus();
    }

    setActiveSentenceIndex(index: number): void {
        // check if the given index is within bounds
        if (index > 0 && index <= this.totalSentenceCount && index <= this.furthestSentenceIndex.getValue()) {
            this.activeSentenceIndex.next(index);

            // check if sentence has recording
            this.checkRecordingStatus();
        }
    }

    // check if the current active sentence is already recorded
    private checkRecordingStatus(): void {
        if (this.activeSentenceIndex.getValue() < this.furthestSentenceIndex.getValue()) {
            this.sentenceHasRecording.next(true);
        } else {
            this.sentenceHasRecording.next(false);
        }
    }

    setNextSentenceActive(): void {
        const next = this.activeSentenceIndex.getValue() + 1;
        this.setActiveSentenceIndex(next);
    }

    setPreviousSentenceActive(): void {
        const previous = this.activeSentenceIndex.getValue() - 1;
        this.setActiveSentenceIndex(previous);
    }

    increaseFurthestSentence(): void {
        if (this.furthestSentenceIndex.getValue() <= this.totalSentenceCount + 1) {
            this.furthestSentenceIndex.next(this.furthestSentenceIndex.getValue() + 1);
            this.checkRecordingStatus();
        }
    }

    getActiveSentenceIndex(): Observable<number> {
        return this.activeSentenceIndex.asObservable();
    }

    getFurthestSentenceIndex(): Observable<number> {
        return this.furthestSentenceIndex.asObservable();
    }

    getSentenceHasRecording(): Observable<boolean> {
        return this.sentenceHasRecording.asObservable();
    }
}
