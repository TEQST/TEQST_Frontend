import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.page.html',
  styleUrls: ['./create-folder.page.scss'],
})
export class CreateFolderPage implements OnInit {

  constructor(public viewCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createFolder() { }

}
