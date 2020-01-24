import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-share-folder',
  templateUrl: './share-folder.page.html',
  styleUrls: ['./share-folder.page.scss'],
})
export class ShareFolderPage implements OnInit {

  constructor(public viewCtrl: ModalController) { }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
  }

}
