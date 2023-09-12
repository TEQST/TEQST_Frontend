import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { DownloadStatisticsPage } from './download-statistics/download-statistics.page';
import { Folder } from '../manage.folder';
import { ManageFolderService } from 'src/app/services/manage-folder.service';
import { DownloadContentPage } from './download-content/download-content.page';

@Component({
  selector: 'app-download-folder',
  templateUrl: './download-folder.component.html',
  styleUrls: ['./download-folder.component.scss'],
})
export class DownloadFolderComponent implements OnInit {

  @Input() folder: Folder;
  @Input() role: 'pub' | 'lstn';

  constructor(
    private modalController: ModalController,
    private viewCtrl: PopoverController,
    private folderService: ManageFolderService) { }

  ngOnInit() {}

  async openStatisticsModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: DownloadStatisticsPage,
    });
    modal.onDidDismiss().then(
      async (returnData) => {
        const data = returnData.data;
        if (data) {
          this.folderService.downloadStatistics(this.folder, this.role, data)
        }
      }
    );
    this.viewCtrl.dismiss();
    await modal.present();
  }

  async openContentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: DownloadContentPage,
      componentProps: {
        folder: this.folder,
      },
    });
    this.viewCtrl.dismiss();
    await modal.present();
  }

}
