import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonNav, ModalController, NavParams } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { ShareFolderService } from 'src/app/services/share-folder.service';
import { ListenerDataService } from '../listener-data.service';
import { ManageListeningsPage } from '../manage-listenings/manage-listenings.page';
import { SelectSpeakerPage } from '../select-speaker/select-speaker.page';

@Component({
  selector: 'app-select-listener',
  templateUrl: './select-listener.page.html',
  styleUrls: ['./select-listener.page.scss'],
})
export class SelectListenerPage implements OnInit {
  @ViewChild('userLists', {read: ElementRef}) userListsElem: ElementRef

  private listeners: User[];
  public filteredListeners: User[];
  private allUsers: User[];
  public filteredUsers: User[];
  private searchTerm = '';
  public navComponent: IonNav


  constructor(public navParams: NavParams,
              private shareFolderService: ShareFolderService,
              private listenerData: ListenerDataService,
              public viewCtrl: ModalController) {

    this.navComponent = navParams.get('navComponent');
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
    const lns = this.listenerData.getListeners();
    this.listeners = lns;
    this.filteredListeners = lns;
    this.filterLists();
    this.userListsElem.nativeElement.classList.add('loaded');
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
    this.listenerData.setListeners(this.listeners);
    this.filterLists();
  }

  async removeListener(speaker: User): Promise<void> {
    // const oldSpeakerIds = this.listeners.map((listener) => listener.id);
    // // remove the listeners from the array
    // const newListenerIds = oldSpeakerIds.filter(
    //     (speakerid) => speakerid != speaker.id);
    this.listeners = this.listeners.filter((user) => user.id != speaker.id);
    this.listenerData.setListeners(this.listeners);
    this.filterLists();
  }

  // showSelectSpeaker(): void {
  //   this.navComponent.push(SelectSpeakerPage, {
  //     folderId: this.folderId,
  //     listeners: this.listeners,
  //   });
  // }

  showSelectSpeaker(): void {
    this.navComponent.push(SelectSpeakerPage, {
      navComponent: this.navComponent,
    });
  }

  showManageListenings(): void {
    this.navComponent.push(ManageListeningsPage);
  }

}

  
  // showDetail(speaker): void {
  //   this.navComponent.push(SpeakerDetailPage, {
  //     folderName: this.folderStats.name,
  //     folderId: this.folderStats.id,
  //     speaker,
  //   });
  // }gonavigateToSelectSpeakerSelectSpeakerPage