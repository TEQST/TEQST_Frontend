import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ManageFolderService } from 'src/app/services/manage-folder.service';
import { CreateFolderPage } from './create-folder/create-folder.page';
import { CreateTextPage } from './create-text/create-text.page';
import { ShareFolderPage } from './share-folder/share-folder.page';
import { Folder } from './manage.folder'
import { Text } from './manage.text'

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  loadingSpinner: any;
  currentFolder = new Folder(null, '/', false)
  subfolders: object;
  texts: object;

  constructor(private manageFolderService: ManageFolderService,
              private route: ActivatedRoute,
              public alertController: AlertController,
              public modalController: ModalController,
              public loadingController: LoadingController) {
      
    Folder.setServiceProvider(manageFolderService)
    Text.setServiceProvider(manageFolderService)
  }

  async ngOnInit() {
    await this.presentLoadingSpinner();

    let urlParam = this.route.snapshot.paramMap.get('folderInfo');
    if (urlParam != null) {
      let is_sharedfolder = urlParam.charAt(0) == 's'
      let folderId = urlParam.substring(1, urlParam.length)
      this.currentFolder = new Folder(folderId, '/', is_sharedfolder)
    }

    if (this.currentFolder.is_sharedfolder) {
      this.initTextList()
    } else {
      this.initSubfolderList()
    }
  }

  // ### folders ###

  initSubfolderList() {
    this.currentFolder.getSubfolderList()
    .pipe(
      finalize(async () => { await this.loadingSpinner.dismiss(); })
    )
    .subscribe(
      data => {
        if (Array.isArray(data)) {
          let subfolders = []
          for (let folderInfo of data) {
            let folder = new Folder(folderInfo.id, folderInfo.name, folderInfo.is_sharedfolder)
            subfolders.push(folder)
          }
          this.subfolders = subfolders
        } else {
          this.showErrorAlert('', 'received invalid data from server!')
        }
      },
      err => this.showErrorAlert(err.status, err.statusText)
    );
  }

  async openCreateFolderModal() {
    const modal = await this.modalController.create({
      component: CreateFolderPage
    })
    modal.onDidDismiss()
      .then(async (returnData) => {
        let data = returnData.data
        if (data) {
          await this.presentLoadingSpinner();
          this.currentFolder.createSubfolder(data.folderName)
            .pipe( finalize(async () => { await this.loadingSpinner.dismiss() }) )
            .subscribe(
              data => this.initSubfolderList(),
              err  => this.showErrorAlert(err.status, err.statusText)
            )
        }
      })
    return await modal.present()
  }

  async openDeleteFolderAlert($event, folder) {
    $event.preventDefault()
    $event.stopPropagation()

    const alert = await this.alertController.create({
      header: 'Attention!',
      message: `Do you really want to delete folder "${folder.name}"?`,
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: async () => {
            await this.presentLoadingSpinner();
            folder.delete()
              .pipe( finalize(async () => { await this.loadingSpinner.dismiss() }) )
              .subscribe(
                data => this.initSubfolderList(),
                err  => this.showErrorAlert(err.status, err.statusText)
              )
          }
        }
      ]
    })
    await alert.present()
  }

  async openShareFolderModal() {
    const modal = await this.modalController.create({
      component: ShareFolderPage
    })
    return await modal.present()
  }

  // ### texts ###

  async initTextList() {
    this.manageFolderService.getTextListFor(this.currentFolder.id)
      .pipe( finalize(async () => { await this.loadingSpinner.dismiss() }) )
      .subscribe(
        data => {
          if (Array.isArray(data)) {
            let texts = []
            for (let textInfo of data) {
              let text = new Text(textInfo.id, textInfo.title)
              texts.push(text)
            }
            this.texts = texts
          } else {
            this.showErrorAlert('', 'received invalid data from server!')
          }
        },
        err => this.showErrorAlert(err.status, err.statusText)
      );
  }

  async openCreateTextModal() {
    const modal = await this.modalController.create({
      component: CreateTextPage
    })
    modal.onDidDismiss()
      .then(async (returnData) => {
        let data = returnData.data
        if (data) {
          await this.presentLoadingSpinner();

          this.manageFolderService.createText(this.currentFolder.id, data.title, data.file)
            .pipe( finalize(async () => { await this.loadingSpinner.dismiss() }) )
            .subscribe(
              data => this.initTextList(),
              err  => this.showErrorAlert(err.status, err.statusText)
            )
        }
      })
    return await modal.present()
  }

  // delete
  async openDeleteTextAlert($event, text) {
    $event.preventDefault()
    $event.stopPropagation()

    const alert = await this.alertController.create({
      header: 'Attention!',
      message: `Do you really want to delete text "${text.title}"?`,
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: async () => {
            await this.presentLoadingSpinner();
            text.delete()
              .pipe( finalize(async () => { await this.loadingSpinner.dismiss() }) )
              .subscribe(
                data => this.initTextList(),
                err  => this.showErrorAlert(err.status, err.statusText)
              )
          }
        }
      ]
    });

    await alert.present();
  }

  // ### other ###

  async presentLoadingSpinner() {
    this.loadingSpinner = await this.loadingController.create({
        message: 'Loading...'
    });
    await this.loadingSpinner.present();
  }

  async showErrorAlert(status, msg) {
    const alert = await this.alertController.create({
      header: 'Error '+status,
      message: msg,
      buttons: [{
        text: 'Reload',
        handler: () => window.location.reload()
      }]
    });

    await alert.present();
  }

}
