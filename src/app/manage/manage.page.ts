import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

import { ManageFolderService } from 'src/app/services/manage-folder.service';
import { CreateFolderPage } from './create-folder/create-folder.page';
import { CreateTextPage } from './create-text/create-text.page';
import { ShareFolderPage } from './share-folder/share-folder.page';
import { Folder } from './manage.folder'
import { Text } from './manage.text'
import { AlertManagerService } from '../services/alert-manager.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})

export class ManagePage implements OnInit {

  public currentFolder: Folder
  public subfolders: Folder[]
  public texts: object


  constructor(private manageFolderService: ManageFolderService,
              private route: ActivatedRoute,
              private alertController: AlertController,
              private modalController: ModalController,
              private alertManager: AlertManagerService) {
      
    Folder.setServiceProvider(manageFolderService)
    Text.setServiceProvider(manageFolderService)

    this.currentFolder = new Folder(null, '/', false)
    this.subfolders = []
    this.texts = []
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    let folderId = this.route.snapshot.paramMap.get('folderId')
    if (folderId != null) {
      this.currentFolder.id = folderId
    }
    this.getFolderInfo()
  }

  // ### folders ###

  async getFolderInfo() {
    this.currentFolder.getSubfolderList()
    .subscribe(
      data => {
        if (Array.isArray(data)) {
          this.initSubfolderList(data)
        } else {
          this.currentFolder.name = data['name']
          this.currentFolder.is_sharedfolder = data['is_sharedfolder']
          let subfolderInfo = data['subfolder']
  
          if (this.currentFolder.is_sharedfolder) {
            this.initTextList()
          } else {
            this.initSubfolderList(subfolderInfo)
          }
        }
      },
      err => this.alertManager.showErrorAlert(err.status, err.statusText)
    )
  }

  initSubfolderList(subfolderInfo) {
    let subfolders = []
    for (let folderInfo of subfolderInfo) {
      let folder = new Folder(folderInfo.id, folderInfo.name, folderInfo.is_sharedfolder)
      subfolders.push(folder)
    }
    this.subfolders = subfolders
  }

  async openCreateFolderModal() {
    const modal = await this.modalController.create({
      component: CreateFolderPage
    })
    modal.onDidDismiss()
      .then(async (returnData) => {
        let data = returnData.data
        if (data) {
          this.currentFolder.createSubfolder(data.folderName)
            .subscribe(
              data => this.getFolderInfo(),
              err  => this.alertManager.showErrorAlert(err.status, err.statusText)
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
            folder.delete()
              .subscribe(
                data => this.getFolderInfo(),
                err  => this.alertManager.showErrorAlert(err.status, err.statusText)
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
            this.alertManager.showErrorAlert('', 'received invalid data from server!')
          }
        },
        err => this.alertManager.showErrorAlert(err.status, err.statusText)
      )
  }

  async openCreateTextModal() {
    const modal = await this.modalController.create({
      component: CreateTextPage
    })
    modal.onDidDismiss()
      .then(async (returnData) => {
        let data = returnData.data
        if (data) {
          this.manageFolderService.createText(this.currentFolder.id, data.title, data.file)
            .subscribe(
              data => {
                if (!this.currentFolder.is_sharedfolder) {
                  this.currentFolder.is_sharedfolder = true
                }
                this.initTextList()
              },
              err  => this.alertManager.showErrorAlert(err.status, err.statusText)
            )
        }
      })
    return await modal.present()
  }

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
            text.delete()
              .subscribe(
                data => this.initTextList(),
                err  => this.alertManager.showErrorAlert(err.status, err.statusText)
              )
          }
        }
      ]
    })

    await alert.present()
  }

}
