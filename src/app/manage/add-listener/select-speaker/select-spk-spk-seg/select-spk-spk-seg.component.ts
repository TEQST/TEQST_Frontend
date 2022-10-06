import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from 'src/app/interfaces/user';
import {ShareFolderService} from 'src/app/services/share-folder.service';
import {ListenerDataService} from '../../listener-data.service';

@Component({
  selector: 'app-select-spk-spk-seg',
  templateUrl: './select-spk-spk-seg.component.html',
  styleUrls: ['./select-spk-spk-seg.component.scss'],
})
export class SelectSpkSpkSegComponent implements OnInit {
  @ViewChild('userLists', {read: ElementRef}) userListsElem: ElementRef

  private speakers: User[];
  public filteredSpeakers: User[];
  private allUsers: User[];
  public filteredUsers: User[];
  private searchTerm = '';

  constructor(
    private shareFolderService: ShareFolderService,
    private listenerData: ListenerDataService,
  ) { }

  ngOnInit(): void {
    this.fetchUserLists();
  }

  async fetchUserLists(): Promise<void> {
    await this.shareFolderService.getAllUsers()
        .toPromise()
        .then((allUsers) => {
          this.allUsers = allUsers;
          this.filteredUsers = allUsers;
        });
    const spks = this.listenerData.getSpeakers();
    this.speakers = spks;
    this.filteredSpeakers = spks;
    this.filterLists();
    this.userListsElem.nativeElement.classList.add('loaded');
  }

  onSearchTerm(event: CustomEvent): void {
    this.searchTerm = event.detail.value;
    this.filterLists();
  }

  filterLists(): void {
    const filtered = this.shareFolderService
        .filterLists(this.speakers, this.allUsers, this.searchTerm);
    this.filteredSpeakers = filtered.filteredList;
    this.filteredUsers = filtered.filteredUsers;
  }

  async addSpeaker(user: User): Promise<void> {
    this.speakers.push(user);
    this.listenerData.setSpeakers(this.speakers);
    this.filterLists();
  }

  async removeSpeaker(speaker: User): Promise<void> {
    this.speakers = this.speakers.filter((user) => user.id != speaker.id);
    this.listenerData.setSpeakers(this.speakers);
    this.filterLists();
  }

}
