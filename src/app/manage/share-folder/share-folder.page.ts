import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ManageFolderService } from 'src/app/services/manage-folder.service';


// interface to handle the user objects better
interface User {
  "id": number,
  "username": string,
  "education": string,
  "gender": string,
  "birth_year": number,
  "languages": number[],
  "country": null
}

@Component({
  selector: 'app-share-folder',
  templateUrl: './share-folder.page.html',
  styleUrls: ['./share-folder.page.scss'],
})

export class ShareFolderPage implements OnInit {

  public folderName: String = "Test"
  private speakers: User[];
  public filteredSpeakers: User[];
  private allUsers: User[];
  public filteredUsers: User[]
  private folderId: number = 3;
  private searchTerm: String = "";

  constructor(public viewCtrl: ModalController, private folderService: ManageFolderService, private route: ActivatedRoute) { }

  ngOnInit() {
    //reset Search term on each opening of the modal
    this.searchTerm = "";
    this.fetchUserLists();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async fetchUserLists() {
    // get a list of all users
    await this.folderService.getAllUsers().toPromise().then((userArray) => {
      this.allUsers = userArray;
      this.filteredUsers = userArray;
    });
    // get a list of all speakers of the folder
    await this.folderService.getSpeakers(this.folderId).toPromise().then((sharedFolder) => {
      this.speakers = sharedFolder['speakers'];
      this.filteredSpeakers = sharedFolder['speakers'];
    });
    this.filterLists();
  }

  // update the search term on text input
  onSearchTerm(event: CustomEvent) {
    this.searchTerm = event.detail.value;
    this.filterLists()
  }

  // filter user and speaker list based on the search term
  filterLists() {
    this.filteredSpeakers = this.speakers.filter((speaker) => {
      return speaker.username.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    });

    this.filteredUsers = this.allUsers.filter((user) => {
      if (user.username.toLowerCase().startsWith(this.searchTerm.toLowerCase())) {
        //remove all users already listed in the speaker list
        return this.filteredSpeakers.findIndex(speaker => speaker.username === user.username) === -1;
      }
      return false;
    });
  }

  async addSpeaker(user: User) {
    //create a new array just with the speaker ids
    let newSpeakers = this.speakers.map(speaker => speaker.id);
    newSpeakers.push(user.id)
    await this.folderService.setSpeakers(this.folderId, newSpeakers).toPromise().then((sharedfolder) => this.speakers = sharedfolder['speakers'])
    this.filterLists();
  }

  async removeSpeaker(speaker: User) {
    let oldSpeakerIds = this.speakers.map(speaker => speaker.id);
    // remove the speaker from the array
    let newSpeakerIds = oldSpeakerIds.filter(speakerid => speakerid != speaker.id)
    await this.folderService.setSpeakers(this.folderId, newSpeakerIds).toPromise().then((sharedfolder) => this.speakers = sharedfolder['speakers'])
    this.filterLists();
  }

}
