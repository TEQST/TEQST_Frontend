import {Component, Input, OnInit} from '@angular/core';
import {User} from 'src/app/interfaces/user';
import {ManageFolderService} from 'src/app/services/manage-folder.service';
import {ShareFolderService} from 'src/app/services/share-folder.service';


@Component({
  selector: 'speakers-segment',
  templateUrl: './speakers-segment.component.html',
  styleUrls: ['./speakers-segment.component.scss'],
})
export class SpeakersSegmentComponent implements OnInit {

  @Input() folderId: number;
  public isPublicForAll: boolean;
  private speakers: User[];
  public filteredSpeakers: User[];
  private allUsers: User[];
  public filteredUsers: User[];
  private searchTerm: string = '';

  constructor(
    private shareFolderService: ShareFolderService) { }


  ngOnInit() {
    // reset Search term on each opening of the modal
    this.searchTerm = '';
    this.fetchUserLists();
  }

  async fetchUserLists() {
    await this.shareFolderService.getSharingSpeakers(this.folderId)
        .toPromise()
        .then((sharedFolder) => {
          this.speakers = sharedFolder['speakers'];
          this.filteredSpeakers = sharedFolder['speakers'];
          this.isPublicForAll = sharedFolder['public'];
        });
    await this.shareFolderService.getAllUsers()
        .toPromise()
        .then((allUsers) => {
          this.allUsers = allUsers;
          this.filteredUsers = allUsers;
        });
    this.filterLists();
  }

  handleFolderPublicityToggle(event) {
    this.setFolderPublicity(event.target.checked);
  }

  async setFolderPublicity(public_for_all) {
    this.isPublicForAll = public_for_all;
    const speakers = this.speakers.map((speaker) => speaker.id);
    await this.shareFolderService.setSharingSpeakers(
        this.folderId,
        speakers,
        this.isPublicForAll)
        .toPromise();
  }

  // update the search term on text input
  onSearchTerm(event: CustomEvent) {
    this.searchTerm = event.detail.value;
    this.filterLists();
  }

  // filter user and speaker list based on the search term
  filterLists() {
    const filtered = this.shareFolderService
        .filterLists(this.speakers, this.allUsers, this.searchTerm);
    this.filteredSpeakers = filtered.filteredList;
    this.filteredUsers = filtered.filteredUsers;
  }

  async addSpeaker(user: User) {
    // create a new array with just the speaker ids
    const newSpeakers = this.speakers.map((speaker) => speaker.id);
    newSpeakers.push(user.id);
    await this.shareFolderService.setSharingSpeakers(
        this.folderId,
        newSpeakers,
        this.isPublicForAll)
        .toPromise()
        .then((sharedfolder) => this.speakers = sharedfolder['speakers']);
    this.filterLists();
  }

  async removeSpeaker(speaker: User) {
    const oldSpeakerIds = this.speakers.map((speaker) => speaker.id);
    // remove the speaker from the array
    const newSpeakerIds = oldSpeakerIds.filter(
        (speakerid) => speakerid != speaker.id);
    await this.shareFolderService.setSharingSpeakers(
        this.folderId,
        newSpeakerIds,
        this.isPublicForAll)
        .toPromise()
        .then((sharedfolder) => this.speakers = sharedfolder['speakers']);
    this.filterLists();
  }

}
