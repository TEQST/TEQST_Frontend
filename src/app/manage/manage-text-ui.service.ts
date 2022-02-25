import {Injectable} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';

import {AlertManagerService} from '../services/alert-manager.service';
import {ManageFolderService} from '../services/manage-folder.service';
import {CreateTextPage} from './create-text/create-text.page';
import {Text} from './manage.text';

@Injectable({
  providedIn: 'root',
})
export class ManageTextUIService {

  constructor(
    private manageFolderService: ManageFolderService,
    private alertController: AlertController,
    private modalController: ModalController,
    private alertManager: AlertManagerService) { }

  // create text objects from the retrieved array of texts
  async initTextList(currentFolder, callback): Promise<void> {
    this.manageFolderService.getTextListFor(currentFolder.id)
        .subscribe(
            (data) => {
              if (Array.isArray(data)) {
                const texts = [];
                for (const textInfo of data) {
                  const text = new Text(textInfo.id, textInfo.title);
                  texts.push(text);
                }
                callback(texts);
              } else {
                this.alertManager.showErrorAlert(
                    '',
                    'received invalid data from server!');
              }
            },
            (err) => this.alertManager.showErrorAlert(
                err.status,
                err.statusText,
                '/manage'),
        );
  }

  async openCreateTextModal(currentFolder, texts, successCallback)
  :Promise<void> {
    const modal = await this.modalController.create({
      component: CreateTextPage,
      componentProps: {
        existingTextNames: texts.map((text) => text.title),
      },
    });
    modal.onDidDismiss()
        .then(async (returnData) => {
          const params = returnData.data;
          if (params) {
            params['shared_folder'] = currentFolder.id;
            this.manageFolderService.createText(params)
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

  async openDeleteTextAlert(text, successCallback): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Attention!',
      message: `Do you really want to delete text "${text.title}"?`,
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: async (): Promise<void> => {
            text.delete()
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
}
