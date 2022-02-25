import {Component, Input, OnInit} from '@angular/core';

import {User} from 'src/app/interfaces/user';
import {ShareFolderService} from 'src/app/services/share-folder.service';

@Component({
  selector: 'listeners-segment',
  templateUrl: './listeners-segment.component.html',
  styleUrls: ['./listeners-segment.component.scss'],
})
export class ListenersSegmentComponent implements OnInit {
  @Input() folderId: number;
  private listeners: User[];
  public filteredListeners: User[];
  private allUsers: User[];
  public filteredUsers: User[];
  private searchTerm = '';

  constructor(
    private shareFolderService: ShareFolderService) { }

  ngOnInit(): void {
    // reset Search term on each opening of the modal
    this.searchTerm = '';
    this.fetchUserLists();
  }

  async fetchUserLists(): Promise<void> {
    await this.shareFolderService.getSharingListeners(this.folderId)
        .toPromise()
        .then((sharedFolder) => {
          this.listeners = sharedFolder['listeners'];
          this.filteredListeners = sharedFolder['listeners'];
        });
    await this.shareFolderService.getAllUsers()
        .toPromise()
        .then((allUsers) => {
          this.allUsers = allUsers;
          this.filteredUsers = allUsers;
        });
    this.filterLists();
  }

  // update the search term on text input
  onSearchTerm(event: CustomEvent): void {
    this.searchTerm = event.detail.value;
    this.filterLists();
  }

  // filter user and speaker list based on the search term
  filterLists(): void {
    const filtered = this.shareFolderService
        .filterLists(this.listeners, this.allUsers, this.searchTerm);
    this.filteredListeners = filtered.filteredList;
    this.filteredUsers = filtered.filteredUsers;
  }

  async addListener(user: User): Promise<void> {
    // create a new array with just the listener ids
    const newListeners = this.listeners.map((listener) => listener.id);
    newListeners.push(user.id);
    await this.shareFolderService.setSharingListeners(
        this.folderId,
        newListeners)
        .toPromise()
        .then((sharedfolder) => this.listeners = sharedfolder['listeners']);
    this.filterLists();
  }

  async removeListener(speaker: User): Promise<void> {
    const oldSpeakerIds = this.listeners.map((listener) => listener.id);
    // remove the listeners from the array
    const newListenerIds = oldSpeakerIds.filter(
        (speakerid) => speakerid != speaker.id);
    await this.shareFolderService.setSharingListeners(
        this.folderId,
        newListenerIds)
        .toPromise()
        .then((sharedfolder) => this.listeners = sharedfolder['listeners']);
    this.filterLists();
  }
}
