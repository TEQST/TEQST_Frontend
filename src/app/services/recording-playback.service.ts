import {BehaviorSubject, Observable} from 'rxjs';
import {SentenceRecordingModel} from './../models/sentence-recording.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Constants} from '../constants';

@Injectable({
  providedIn: 'root',
})
export class RecordingPlaybackService {

  private SERVER_URL = Constants.SERVER_URL;
  
  private cacheSize = 10;
  private cache: SentenceRecordingModel[] = [];

  private audio = new Audio();
  private isPlaying = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService) { }

  public async playSentenceRecording(
      recordingId: number,
      sentenceNumber: number): Promise<void> {

    const cacheIndex = this.findCacheIndex(recordingId, sentenceNumber);
    let audioBlob: Blob;
    if (cacheIndex > -1) {
      audioBlob = this.getCachedRecording(cacheIndex).audioBlob;
    } else {
      audioBlob = await this.fetchSentenceRecordingBlob(
          recordingId,
          sentenceNumber);
      // cache the recording that was fetched from server
      this.addToCache(new SentenceRecordingModel(
          recordingId,
          sentenceNumber,
          audioBlob));
    }

    this.audio.src = URL.createObjectURL(audioBlob);
    this.audio.load();

    await this.audio.play();
    this.isPlaying.next(true);

    // eventlistener to update ui during playback
    this.audio.addEventListener('play', () => {
      this.isPlaying.next(true);
    });
    this.audio.addEventListener('pause', () => {
      this.isPlaying.next(false);
    });

  }

  // stop audio playback
  public stopAudioPlayback(): void {
    this.audio.pause();
    this.audio.currentTime = 0;

  }

  public addToCache(sentenceRecording: SentenceRecordingModel): void {
    const cacheIndex = this.findCacheIndex(
        sentenceRecording.recordingId,
        sentenceRecording.sentenceNumber);

    // If there is already a recording for the sentence in the cache delete it.
    if (cacheIndex > -1) {
      this.cache.splice(cacheIndex, 1);
    }

    this.cache.push(sentenceRecording);

    // Remove oldest element if cache is bigger than the set cacheSize
    if (this.cache.length > this.cacheSize) {
      this.cache.shift();
    }
  }

  private getCachedRecording(index: number): SentenceRecordingModel {
    const requestedRecording = this.cache[index];
    this.addToCache(requestedRecording); // Refresh Element in cache
    return requestedRecording;
  }

  /* return index of sentenceRecording in cache or -1
     if the current sentenceRecording is not in the cache yet */
  private findCacheIndex(recordingId: number, sentenceNumber: number): number {
    const recordingIndex = this.cache.findIndex((recording) => {
      return recording.recordingId === recordingId &&
             recording.sentenceNumber === sentenceNumber;
    });
    return recordingIndex;
  }


  // get recordings of already recorded sentences from the server
  private async fetchSentenceRecordingBlob(
      recordingId: number,
      sentenceNumber: number): Promise<Blob> {

    // set blob as response type
    const audioHttpOptions = {
      responseType: 'blob' as 'json',
    };
    // TODO: Switch to new sentencerecording URL as soon as its active
    const url = this.SERVER_URL +
      `/api/sentencerecordings/${recordingId}/${sentenceNumber}/`;
    return await this.http.get<Blob>(url, audioHttpOptions).toPromise();
  }

  public getIsPlaying(): Observable<boolean> {
    return this.isPlaying.asObservable();
  }
}
