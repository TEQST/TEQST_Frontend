import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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

  wget_cmd = "wget --recursive --content-disposition --no-host-directories --cut-dirs=2 --reject=\"index.html*\"";
  wget2_cmd = "wget2 --recursive --no-host-directories --cut-dirs=2 --cut-file-get-vars --reject=\"index.html\"";

  key_url = "url";
  key_wg1 = "wg1";
  key_wg2 = "wg2";

  constructor(
    private toastController: ToastController,
    private viewCtrl: ModalController) {
      // Grab base url for backend server
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

  getContent(key: string): string {
    switch (key) {
      case this.key_url:
        return this.server + this.folder.dlpath;
      case this.key_wg1:
        return `${this.wget_cmd} \"${this.server}${this.folder.dlpath}\"`;
      case this.key_wg2:
        return `${this.wget2_cmd} \"${this.server}${this.folder.dlpath}\"`;
      default:
        return "";
    }
  }

  async copyLink($event, key: string): Promise<void> {
    $event.preventDefault();
    $event.stopPropagation();
    navigator.clipboard.writeText( this.getContent(key) )
    const toast = await this.toastController.create({
      message: 'Successfully copied to clipboard!',
      icon: 'checkmark',
      color: 'success',
      position: 'bottom',
      animated: true,
      duration: 1000,
    });
    await toast.present();
  }

}
