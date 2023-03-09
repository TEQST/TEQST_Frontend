import {Injectable} from '@angular/core';

import {User} from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ListenerDataService {

  private creating: boolean;
  private listeningId: number;
  private folderId: number;
  private listeners: User[];
  private speakers: User[];
  private accents: string[];
  private allSpeakers: boolean;

  wipeSelectableData(): void {
    this.listeners = [];
    this.speakers = [];
    this.accents = [];
    this.allSpeakers = false;
  }

  setCreating(creating): void {
    this.creating = creating;
  }

  getCreating(): boolean {
    return this.creating;
  }

  setListeningId(id: number): void {
    this.listeningId = id;
  }

  getListeningId(): number {
    return this.listeningId;
  }

  setFolderId(folderId: number): void {
    this.folderId = folderId;
  }

  getFolderId(): number {
    return this.folderId;
  }

  setListeners(listeners): void {
    this.listeners = listeners;
  }

  getListeners(): User[] {
    return this.listeners;
  }

  setSpeakers(speakers): void {
    this.speakers = speakers;
  }

  getSpeakers(): User[] {
    return this.speakers;
  }

  setAccents(accents): void {
    this.accents = accents;
  }

  getAccents(): string[] {
    return this.accents;
  }

  setAllSpeakers(allSpeakers): void {
    this.allSpeakers = allSpeakers;
  }

  getAllSpeakers(): boolean {
    return this.allSpeakers;
  }
}
