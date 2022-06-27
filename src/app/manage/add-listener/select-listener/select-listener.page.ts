import { Component, Input, OnInit } from '@angular/core';
import { IonNav, NavParams } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { ShareFolderService } from 'src/app/services/share-folder.service';
import { SelectSpeakerPage } from '../select-speaker/select-speaker.page';

@Component({
  selector: 'app-select-listener',
  templateUrl: './select-listener.page.html',
  styleUrls: ['./select-listener.page.scss'],
})
export class SelectListenerPage implements OnInit {

  public folderId: number;
  public folderName: string;
  private listeners: User[];
  public filteredListeners: User[];
  private allUsers: User[];
  public filteredUsers: User[];
  private searchTerm = '';
  public navComponent: IonNav


  constructor(public navParams: NavParams,
              private shareFolderService: ShareFolderService) {

    this.navComponent = navParams.get('navComponent');
    this.folderId = navParams.get('folderId');
    this.folderName = navParams.get('folderName');
  }

  ngOnInit(): void {
    // reset Search term on each opening of the modal
    this.searchTerm = '';
    this.fetchUserLists();
  }

  async fetchUserLists(): Promise<void> {
    // await this.shareFolderService.getSharingListeners(this.folderId)
    //     .toPromise()
    //     .then((sharedFolder) => {
    //       this.listeners = sharedFolder['listeners'];
    //       this.filteredListeners = sharedFolder['listeners'];
    //     });
    await this.shareFolderService.getAllUsers()
        .toPromise()
        .then((allUsers) => {
          this.allUsers = allUsers;
          this.filteredUsers = allUsers;
        });
    this.listeners = [];
    this.filteredListeners = [];
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
    console.log(this.filteredUsers);
  }

  async addListener(user: User): Promise<void> {
    // create a new array with just the listener ids
    // const newListeners = this.listeners.map((listener) => listener.id);
    // newListeners.push(user.id);
    this.listeners.push(user);
    this.filterLists();
  }

  async removeListener(speaker: User): Promise<void> {
    // const oldSpeakerIds = this.listeners.map((listener) => listener.id);
    // // remove the listeners from the array
    // const newListenerIds = oldSpeakerIds.filter(
    //     (speakerid) => speakerid != speaker.id);
    this.listeners = this.listeners.filter((user) => user.id != speaker.id);
    this.filterLists();
  }

  // showSelectSpeaker(): void {
  //   this.navComponent.push(SelectSpeakerPage, {
  //     folderId: this.folderId,
  //     listeners: this.listeners,
  //   });
  // }

}

  
  // showDetail(speaker): void {
  //   this.navComponent.push(SpeakerDetailPage, {
  //     folderName: this.folderStats.name,
  //     folderId: this.folderStats.id,
  //     speaker,
  //   });
  // }gonavigateToSelectSpeakerSelectSpeakerPage