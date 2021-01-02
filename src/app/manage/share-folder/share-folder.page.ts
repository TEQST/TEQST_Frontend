import {Component, OnInit, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
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

export class ShareFolderPage implements OnInit {

  @Input() folderId: number;
  @Input() folderName: string;

  constructor(public viewCtrl: ModalController,
    private route: ActivatedRoute) { }

  ngOnInit() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  segmentChanged($event) {
    console.log($event);
  }

}
