import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ManageFolderService } from 'src/app/services/manage-folder.service';
import { CreateFolderPage } from './create-folder/create-folder.page';
import { CreateTextPage } from './create-text/create-text.page';
import { ShareFolderPage } from './share-folder/share-folder.page';
import { Folder } from './folder'

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  loading: any;
  currentFolder = new Folder(null, '/', false)
  texts: object;
  subfolders: object;

  constructor(private manageFolderService: ManageFolderService,
              private route: ActivatedRoute,
              public alertController: AlertController,
              public modalController: ModalController,
              public loadingController: LoadingController) {
      
    Folder.setServiceProvider(manageFolderService)
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

  initSubfolderList() {
    this.currentFolder.getSubfolderList()
    .pipe(
      finalize(async () => { await this.loading.dismiss(); })
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
          this.showErrorAlert('', 'invalid data from server!')
        }
      },
      err => {
        this.showErrorAlert(err.status, err.statusText)
      }
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
            .pipe(
              finalize(async () => { await this.loading.dismiss(); })
            )
            .subscribe(
              data => {
                this.initSubfolderList()
              },
              err => {
                this.showErrorAlert(err.status, err.statusText)
              }
            );
        }
      });
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
              .pipe(
                finalize(async () => { await this.loading.dismiss(); })
              )
              .subscribe(
                data => {
                  this.initSubfolderList()
                },
                err => {
                  this.showErrorAlert(err.status, err.statusText)
                }
              );
          }
        }
      ]
    });
    await alert.present();
  }

  // ### texts ###
  async initTextList() {
    this.manageFolderService.getTextList(this.currentFolder.id)
      .pipe(
        finalize(async () => { await this.loading.dismiss(); })
      )
      .subscribe(
        data => {
          this.texts = data
        },
        err => {
          this.showErrorAlert(err.status, err.statusText)
        }
      );
  }

  // create modal
  async openCreateTextModal() {
    const modal = await this.modalController.create({
      component: CreateTextPage
    })
    return await modal.present()
  }

  // share
  async openShareFolderModal() {
    const modal = await this.modalController.create({
      component: ShareFolderPage
    })
    return await modal.present()
  }

  // delete
  async openDeleteTextAlert(event) {
    event.preventDefault()
    event.stopPropagation()

    const alert = await this.alertController.create({
      header: 'Attention!',
      message: 'Do you really want to delete this text?',
      buttons: ['Yes', 'No']
    });

    await alert.present();
  }

  // ### other ###

  async presentLoadingSpinner() {
    this.loading = await this.loadingController.create({
        message: 'Loading...'
    });
    await this.loading.present();
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
