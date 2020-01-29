import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ManageFolderService } from 'src/app/services/manage-folder.service';
import { CreateFolderPage } from './create-folder/create-folder.page';
import { CreateTextPage } from './create-text/create-text.page';
import { ShareFolderPage } from './share-folder/share-folder.page';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  loading: any;
  folderId: string
  is_sharedfolder: boolean
  folderName: string
  texts: object;
  subfolders: object;

  constructor(private manageFolderService: ManageFolderService,
              private route: ActivatedRoute,
              public alertController: AlertController,
              public modalController: ModalController,
              public loadingController: LoadingController) { }

  async ngOnInit() {
    await this.presentLoadingSpinner();

    let urlParam = this.route.snapshot.paramMap.get('folderInfo');
    if (urlParam == null) {
      this.is_sharedfolder = false
      this.folderId = null
      this.folderName = '/'
    } else {
      this.is_sharedfolder = urlParam.charAt(0) == 's'
      this.folderId = urlParam.substring(1, urlParam.length)
    }

    if (this.is_sharedfolder) {
      this.initTextList()
    } else {
      this.initSubfolderList()
    }
  }

  // ### folders ###

  // list
  async initSubfolderList() {
    this.manageFolderService.getSubfolderListFor(this.folderId)
      .pipe(
        finalize(async () => { await this.loading.dismiss(); })
      )
      .subscribe(
        data => {
          this.subfolders = data
        },
        err => {
          this.showErrorAlert(err.status, err.statusText)
        }
      );
  }

  // create modal
  async openCreateFolderModal() {
    const modal = await this.modalController.create({
      component: CreateFolderPage
    })
    modal.onDidDismiss()
      .then((returnData) => {
        let data = returnData.data
        if (data) {
          this.createFolder(data.folderName)
        }
      });
    return await modal.present()
  }

  // create
  async createFolder(folderName) {
    await this.presentLoadingSpinner();
    this.manageFolderService.createFolder(this.folderId, folderName)
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

  // delete
  async openDeleteFolderAlert(event) {
    event.preventDefault()
    event.stopPropagation()

    const alert = await this.alertController.create({
      header: 'Attention!',
      message: 'Do you really want to delete this folder?',
      buttons: ['Yes', 'No']
    });

    await alert.present();
  }

  // ### texts ###
  async initTextList() {
    this.manageFolderService.getTextList(this.folderId)
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
