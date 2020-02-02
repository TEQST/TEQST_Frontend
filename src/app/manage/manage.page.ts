import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

import { ManageFolderService } from 'src/app/services/manage-folder.service';
import { CreateFolderPage } from './create-folder/create-folder.page';
import { CreateTextPage } from './create-text/create-text.page';
import { ShareFolderPage } from './share-folder/share-folder.page';
import { Folder } from './manage.folder'
import { Text } from './manage.text'
import { PopupNotifier } from '../popupNotifier/popup-notifier';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})

export class ManagePage implements OnInit {

  private currentFolder: Folder
  private subfolders: object
  private texts: object

  constructor(private manageFolderService: ManageFolderService,
              private route: ActivatedRoute,
              private alertController: AlertController,
              private modalController: ModalController,
              private popupNotifier: PopupNotifier) {
      
    Folder.setServiceProvider(manageFolderService)
    Text.setServiceProvider(manageFolderService)

    this.currentFolder = new Folder(null, '/', false)
    this.subfolders = []
    this.texts = []
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.popupNotifier.showLoadingSpinner();

    let urlParam = this.route.snapshot.paramMap.get('folderInfo')
    if (urlParam != null) {
      let is_sharedfolder = urlParam.charAt(0) == 's'
      let folderId = urlParam.substring(1, urlParam.length)
      this.currentFolder = new Folder(folderId, '', is_sharedfolder)
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
      finalize(async () => { await this.popupNotifier.hideLoadingSpinner(); })
    )
    .subscribe(
      data => {
        let subfolderInfo = []
        if (Array.isArray(data)) {
          subfolderInfo = data
        } else {
          this.currentFolder.name = data['name']
          subfolderInfo = data['subfolder']
        }

        let subfolders = []
        for (let folderInfo of subfolderInfo) {
          let folder = new Folder(folderInfo.id, folderInfo.name, folderInfo.is_sharedfolder)
          subfolders.push(folder)
        }
        this.subfolders = subfolders
      },
      err => this.popupNotifier.showErrorAlert(err.status, err.statusText)
    )
  }

  async openCreateFolderModal() {
    const modal = await this.modalController.create({
      component: CreateFolderPage
    })
    modal.onDidDismiss()
      .then(async (returnData) => {
        let data = returnData.data
        if (data) {
          await this.popupNotifier.showLoadingSpinner();
          this.currentFolder.createSubfolder(data.folderName)
            .pipe( finalize(async () => { await this.popupNotifier.hideLoadingSpinner() }) )
            .subscribe(
              data => this.initSubfolderList(),
              err  => this.popupNotifier.showErrorAlert(err.status, err.statusText)
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
            await this.popupNotifier.showLoadingSpinner();
            folder.delete()
              .pipe( finalize(async () => { await this.popupNotifier.hideLoadingSpinner() }) )
              .subscribe(
                data => this.initSubfolderList(),
                err  => this.popupNotifier.showErrorAlert(err.status, err.statusText)
              )
          }
        }
      ]
    })
    await alert.present()
  }

  async openShareFolderModal() {
    const modal = await this.modalController.create({
      component: ShareFolderPage,
      componentProps: {
        folderId: this.currentFolder.id,
        folderName: this.currentFolder.name
      }
    })
    return await modal.present()
  }

  // ### texts ###

  async initTextList() {
    this.manageFolderService.getTextListFor(this.currentFolder.id)
      .pipe( finalize(async () => { await this.popupNotifier.hideLoadingSpinner() }) )
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
            this.popupNotifier.showErrorAlert('', 'received invalid data from server!')
          }
        },
        err => this.popupNotifier.showErrorAlert(err.status, err.statusText)
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
          await this.popupNotifier.showLoadingSpinner();

          this.manageFolderService.createText(this.currentFolder.id, data.title, data.file)
            .pipe( finalize(async () => { await this.popupNotifier.hideLoadingSpinner() }) )
            .subscribe(
              data => {
                if (!this.currentFolder.is_sharedfolder) {
                  this.currentFolder.is_sharedfolder = true
                  history.replaceState('', 'manage', 'manage/s'+this.currentFolder.id)
                }
                this.initTextList()
              },
              err  => this.popupNotifier.showErrorAlert(err.status, err.statusText)
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
            await this.popupNotifier.showLoadingSpinner();
            text.delete()
              .pipe( finalize(async () => { await this.popupNotifier.hideLoadingSpinner() }) )
              .subscribe(
                data => this.initTextList(),
                err  => this.popupNotifier.showErrorAlert(err.status, err.statusText)
              )
          }
        }
      ]
    });

    await alert.present()
  }

}
