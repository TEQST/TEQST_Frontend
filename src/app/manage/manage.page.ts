import { Component, OnInit } from '@angular/core';
import { FolderManageService } from 'src/app/services/manage-folder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CreateFolderPage } from './create-folder/create-folder.page';
import { CreateTextPage } from './create-text/create-text.page';
import { ShareFolderPage } from './share-folder/share-folder.page';



@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  folderId: string
  folderType: string
  folderName: string
  folders: { id: string; name: string; type: string; }[];
  texts: { id: string; name: string; }[];

  constructor(private folderManageService: FolderManageService,
              private route: ActivatedRoute,
              private router: Router,
              public alertController: AlertController,
              public modalController: ModalController) { }

  ngOnInit() {
    this.initFolder()
  }

  initFolder() {
    let urlParam = this.route.snapshot.paramMap.get('folderInfo');
    if (urlParam == null) {
      this.folderType = 'folder'
      this.folderId = null
      this.folderName = '/'
    } else {
      let folderTypeStr = urlParam.charAt(0)
      this.folderType = folderTypeStr == 'f' ? 'folder' : 'sharedFolder'
      this.folderId = urlParam.substring(1, urlParam.length)
      let folderInfo = this.folderManageService.getFolderInfo(this.folderId)
      if (folderInfo == null) { } // TODO: show error alert message and redirect to root directory
      else {
        this.folderName = folderInfo.name
      }
    }
    
    if (this.folderType == 'folder') {
      this.folders = this.folderManageService.getSubfolderList(this.folderId)
    } else { // is sharedFolder
      this.texts = this.folderManageService.getTextList(this.folderId)
    }
  }

  async openCreateFolderModal() {
    const modal = await this.modalController.create({
    component: CreateFolderPage
    })
    return await modal.present()
  }

  async openCreateTextModal() {
    const modal = await this.modalController.create({
    component: CreateTextPage
    })
    return await modal.present()
  }

  async openShareFolderModal() {
    const modal = await this.modalController.create({
      component: ShareFolderPage
    })
    return await modal.present()
  }

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

}
