import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Folder } from '../../manage.folder';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-download-content',
  templateUrl: './download-content.page.html',
  styleUrls: ['./download-content.page.scss'],
})
export class DownloadContentPage implements OnInit {

  @Input() folder: Folder;

  server: string;

  constructor(
    private viewCtrl: ModalController) {
      if (Constants.SERVER_URL) {
        this.server = Constants.SERVER_URL;
      } else {
        console.log(location)
        this.server = `${location.protocol}//${location.host}`;
      }
    }

  ngOnInit() {}

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
