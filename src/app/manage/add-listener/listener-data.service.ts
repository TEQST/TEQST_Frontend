import {Injectable} from '@angular/core';
import {User} from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ListenerDataService {

  private folderId: number;
  private listeners: User[];
  private speakers: User[];
  private accents: string[];

  constructor() { }

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
}
