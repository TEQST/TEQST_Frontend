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
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})

export class ManagePage implements OnInit {

  public currentFolder: Folder
  public subfolders: Folder[]
  public texts: Text[]


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
    // retrieve folder id from url
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
          // on the topmost filesystem level only an array of folders exist
          this.initSubfolderList(data)
        } else {
          // get information about the current folder
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
      err => this.alertManager.showErrorAlert(err.status, err.statusText, '/manage')
    )
  }

  // create folder objects from the given subfolderInfo data
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
      component: CreateFolderPage,
      componentProps: { 
        existingFolderNames: this.subfolders.map(folder => folder.name)
      }
    })
    modal.onDidDismiss()
      .then(async (returnData) => {
        let data = returnData.data
        if (data) {
          this.currentFolder.createSubfolder(data.folderName)
            .subscribe(
              () => this.getFolderInfo(),
              err  => this.alertManager.showErrorAlertNoRedirection(err.status, err.statusText)
            )
        }
      })
    return await modal.present()
  }

  async openDeleteFolderAlert($event, folder) {
    // cancel click event to prevent opening the folder
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
                () => this.getFolderInfo(),
                err  => this.alertManager.showErrorAlertNoRedirection(err.status, err.statusText)
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
        // pass variables to the modal
        folderId: this.currentFolder.id,
        folderName: this.currentFolder.name
      }
    })
    return await modal.present()
  }

  downloadFolder() {
    this.manageFolderService.downloadFolder(parseInt(this.currentFolder.id, 10)).subscribe(zipData => {
      const blob = new Blob([zipData], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    },
    (error: HttpErrorResponse) => {
      this.alertManager.showErrorAlertNoRedirection('No download available', 'No Speaker has finished a text of the current folder yet. Please try again later.')
    }
    );
  }

  // ### texts ###

  // create text objects from the retrieved array of texts
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
        err => this.alertManager.showErrorAlert(err.status, err.statusText, '/manage')
      )
  }

  async openCreateTextModal() {
    const modal = await this.modalController.create({
      component: CreateTextPage,
      componentProps: { 
        existingTextNames: this.texts.map(text => text.title)
      }
    })
    modal.onDidDismiss()
      .then(async (returnData) => {
        let data = returnData.data
        if (data) {
          this.manageFolderService.createText(this.currentFolder.id, data.title, data.file)
            .subscribe(
              () => {
                this.currentFolder.is_sharedfolder = true
                // reload text list
                this.initTextList()
              },
              err  => this.alertManager.showErrorAlertNoRedirection(err.status, err.statusText)
            )
        }
      })
    return await modal.present()
  }

  async openDeleteTextAlert($event, text) {
    // cancel click event to prevent opening the text
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
                () => this.initTextList(),
                err  => this.alertManager.showErrorAlertNoRedirection(err.status, err.statusText)
              )
          }
        }
      ]
    })

    await alert.present()
  }

}
