import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FolderManageService } from 'src/app/services/folder-manage.service';

@Component({
  selector: 'app-share-folder',
  templateUrl: './share-folder.page.html',
  styleUrls: ['./share-folder.page.scss'],
})
export class ShareFolderPage implements OnInit {

  private speakers: String[];
  public filteredSpeakers: String[] = this.folderService.getSpeakers();
  private allUsers: String[];
  public filteredUsers: String[] = this.folderService.getAllUsers();;

  constructor(public viewCtrl: ModalController, private folderService: FolderManageService) { }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSearchTerm(event: CustomEvent) {
    let searchTerm = event.detail.value;
    this.speakers = this.folderService.getSpeakers();
    this.filteredSpeakers = this.speakers.filter((speaker) => {
      return speaker.toLowerCase().startsWith(searchTerm.toLowerCase())
    });

    this.allUsers = this.folderService.getAllUsers();
    this.filteredUsers = this.allUsers.filter((user) => {
      if (this.filteredSpeakers.includes(user)) return false; // do not list names already listed in the added speaker section
      return user.toLowerCase().startsWith(searchTerm.toLowerCase())
    });
  }

  addSpeaker(user: String) {

  }

  removeSpeaker(user: String) {

  }

}
