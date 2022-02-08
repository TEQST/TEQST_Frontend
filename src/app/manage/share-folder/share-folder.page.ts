import {Component, Input, ViewChild} from '@angular/core';
import {IonSlides, ModalController} from '@ionic/angular';

import {User} from 'src/app/interfaces/user';

// // interface to handle the user objects better
// interface User {
//   'id': number,
//   'username': string,
//   'education': string,
//   'gender': string,
//   'birth_year': number,
//   'languages': number[],
//   'country': null;
// }

@Component({
  selector: 'app-share-folder',
  templateUrl: './share-folder.page.html',
  styleUrls: ['./share-folder.page.scss'],
})

export class ShareFolderPage {

  @Input() folderId: number;
  @Input() folderName: string;
  @ViewChild('slides', {static: true}) slider: IonSlides;
  segment = 0;

  public isPublicForAll: boolean
  public filteredSpeakers: User[];
  public filteredUsers: User[]

  constructor(public viewCtrl: ModalController) {}

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  async segmentChanged($event): Promise<void> {
    await this.slider.slideTo($event.detail.value);
  }

  async slideChanged(): Promise<void> {
    this.segment = await this.slider.getActiveIndex();
  }

}
