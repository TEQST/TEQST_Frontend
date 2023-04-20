import {Injectable} from '@angular/core';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';

import {AlertManagerService} from '../services/alert-manager.service';
import {AddListenerPage} from './add-listener/add-listener.page';
import {CreateFolderPage} from './create-folder/create-folder.page';
import {FolderStatsPage} from './folder-stats/folder-stats.page';
import { DownloadFolderComponent } from './download-folder/download-folder.component';
import {Folder} from './manage.folder';

@Injectable({
  providedIn: 'root',
})
export class ManageFolderUIService {

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private alertManager: AlertManagerService) {}

  // create folder objects from the given subfolderInfo data
  initSubfolderList(subfolderInfo): any {
    const subfolders = [];
    for (const folderInfo of subfolderInfo) {
      const folder = new Folder(
          folderInfo.id,
          folderInfo.root,
          folderInfo.name,
          folderInfo.is_sharedfolder);
      subfolders.push(folder);
    }
    return subfolders;
  }

  async openCreateFolderModal(currentFolder, subfolders, successCallback)
  :Promise<void> {
    const modal = await this.modalController.create({
      component: CreateFolderPage,
      componentProps: {
        existingFolderNames: subfolders.map((folder) => folder.name),
      },
    });
    modal.onDidDismiss()
        .then(async (returnData) => {
          const data = returnData.data;
          if (data) {
            currentFolder.createSubfolder(data.folderName)
                .subscribe(
                    successCallback,
                    (err) => this.alertManager.showErrorAlertNoRedirection(
                        err.status,
                        err.statusText),
                );
          }
        });
    await modal.present();
  }

  async openDeleteFolderAlert(folder, successCallback): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Attention!',
      message: `Do you really want to delete folder "${folder.name}"?`,
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: async (): Promise<void> => {
            folder.delete()
                .subscribe(
                    successCallback,
                    (err) => this.alertManager.showErrorAlertNoRedirection(
                        err.status,
                        err.statusText),
                );
          },
        },
      ],
    });
    await alert.present();
  }

  async openAddListenerModal(currentFolder): Promise<void> {
    const modal = await this.modalController.create({
      component: AddListenerPage,
      componentProps: {
        folderId: currentFolder.id,
        folderName: currentFolder.name,
      },
    });
    return await modal.present();
  }

  async openFolderStatsModal(currentFolder): Promise<void> {
    const modal = await this.modalController.create({
      component: FolderStatsPage,
      componentProps: {
        // pass variables to the modal
        folderId: currentFolder.id,
        folderName: currentFolder.name,
        role: 'pub',
      },
    });
    return await modal.present();
  }

  async presentDownloadSelect(ev: any, folder): Promise<void> {
    const popover = await this.popoverController.create({
      component: DownloadFolderComponent,
      componentProps: {
        folder: folder,
        role: 'pub',
      },
      event: ev,
      translucent: true,
      showBackdrop: false,
    });
    return await popover.present();
  }

}
