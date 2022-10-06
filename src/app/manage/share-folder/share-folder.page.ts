import {Component, Input, ViewChild} from '@angular/core';
import {IonSlides, ModalController} from '@ionic/angular';

import {User} from 'src/app/interfaces/user';

@Component({
  selector: 'app-share-folder',
  templateUrl: './share-folder.page.html',
  styleUrls: ['./share-folder.page.scss'],
})

export class ShareFolderPage {

  @Input() folderId: number;
  @Input() folderName: string;

  public isPublicForAll: boolean
  public filteredSpeakers: User[];
  public filteredUsers: User[]

  constructor(public viewCtrl: ModalController) {}

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

}
