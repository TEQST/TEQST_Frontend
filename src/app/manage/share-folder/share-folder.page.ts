import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {IonSlides, ModalController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

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

export class ShareFolderPage implements OnInit {

  @Input() folderId: number;
  @Input() folderName: string;
  @ViewChild('slides', {static: true}) slider: IonSlides;
  segment = 0;

  constructor(public viewCtrl: ModalController,
    private route: ActivatedRoute) { }

  ngOnInit() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async segmentChanged($event) {
    await this.slider.slideTo($event.detail.value);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

}
