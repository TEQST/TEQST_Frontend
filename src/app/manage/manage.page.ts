import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {saveAs} from 'file-saver';
import {Observable} from 'rxjs';

import {Folder} from './manage.folder';
import {Text} from './manage.text';
import {ManageFolderService} from 'src/app/services/manage-folder.service';
import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {StatisticsService} from 'src/app/services/statistics.service';
import {LoaderService} from 'src/app/services/loader.service';
import {ManageFolderUIService} from './manage-folder-ui.service';
import {ManageTextUIService} from './manage-text-ui.service';
import {BaseComponent} from 'src/app/base-component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})

export class ManagePage extends BaseComponent {

  @ViewChild('textList', {read: ElementRef}) textListElem: ElementRef
  @ViewChild('folderList', {read: ElementRef}) folderListElem: ElementRef
  @ViewChild('sharedFolderActions',
      {read: ElementRef}) sharedFolderActions: ElementRef

  public currentFolder: Folder
  public subfolders: Folder[]
  public texts: Text[]
  public username: string
  public showMultiSelect = false;
  public deleteSelectionButtonDisabled = true;

  constructor(public loaderService: LoaderService,
              public toastController: ToastController,
              private manageFolderService: ManageFolderService,
              private manageFolderUIService: ManageFolderUIService,
              private manageTextUIService: ManageTextUIService,
              private statisticsService: StatisticsService,
              private alertController: AlertController,
              private router: Router,
              private route: ActivatedRoute,
              private alertManager: AlertManagerService) {

    super(loaderService);
    Folder.setServiceProvider(manageFolderService);
    Text.setServiceProvider(manageFolderService);

    this.username = localStorage.getItem('username');

    const routeParams = this.router.getCurrentNavigation().extras.state;
    if (typeof routeParams !== 'undefined' && 'folder' in routeParams) {
      this.currentFolder = routeParams.folder;
    } else {
      this.currentFolder = new Folder(null, null, null, '', false);
    }

    this.subfolders = [];
    this.texts = [];
  }

  async ionViewWillEnter(): Promise<void> {
    this.subfolders = [];
    this.texts = [];
    this.folderListElem.nativeElement.classList.remove('loaded');
    this.textListElem.nativeElement.classList.remove('loaded');

    // retrieve folder id from url
    const folderId = this.route.snapshot.paramMap.get('folderId');
    if (folderId == null) {
      this.currentFolder.id = '';
      this.currentFolder.name = '/';
    } else {
      this.currentFolder.id = folderId;
    }
    this.getFolderInfo();
  }

  async getFolderInfo(): Promise<void> {
    this.currentFolder.getSubfolderList()
        .subscribe(
            async (data) => {
              if (Array.isArray(data)) {
                /* on the topmost filesystem level
               only an array of folders exist */
                this.subfolders = this.manageFolderUIService.
                    initSubfolderList(data);

                this.folderListElem.nativeElement.classList.add('loaded');
              } else {
                // get information about the current folder
                this.currentFolder.name = data['name'];
                this.currentFolder.is_sharedfolder = data['is_sharedfolder'];
                this.currentFolder.uid = data['root'];
                this.currentFolder.dlpath = data['path'];
                const subfolderInfo = data['subfolder'];

                if (this.currentFolder.is_sharedfolder) {
                  await this.manageTextUIService.
                      initTextList(this.currentFolder, (texts) => {
                        this.texts = texts;
                        this.textListElem.nativeElement.classList.add('loaded');
                      });
                } else {
                  this.subfolders = this.manageFolderUIService.
                      initSubfolderList(subfolderInfo);
                  this.folderListElem.nativeElement.classList.add('loaded');
                }
              }
            },
            (err) => this.alertManager.showErrorAlert(
                err.status, err.statusText, '/manage'),
        );
  }

  openCreateFolderModal(): void {
    this.manageFolderUIService.openCreateFolderModal(
        this.currentFolder, this.subfolders, () => this.getFolderInfo());
  }

  toggleMultiSelect(): void {
    if (this.showMultiSelect) {
      this.uncheckAllItems();
    }
    this.showMultiSelect = !this.showMultiSelect;
  }

  toggleSelectItem(e): void {
    if (e.target.nodeName == 'ION-CHECKBOX') {
      return;
    }
    const item = e.target.querySelector('.selectCheckbox');
    item.checked = !item.checked;
    this.updateDeleteButtonDisabledState();
  }

  uncheckAllItems(): void {
    this.setAllItemsCheckedState(false);
    this.deleteSelectionButtonDisabled = true;
  }

  checkAllItems(): void {
    this.setAllItemsCheckedState(true);
    this.updateDeleteButtonDisabledState();
  }

  getAllCheckboxes(): any {
    const container = this.currentFolder.is_sharedfolder ?
      this.textListElem : this.folderListElem;
    return container.nativeElement.querySelectorAll('.selectCheckbox');
  }

  toggleAllItemsCheckedState(): void {
    for (const checkbox of this.getAllCheckboxes()) {
      if (!checkbox.checked) {
        this.checkAllItems();
        return;
      }
    }
    this.uncheckAllItems();
    this.updateDeleteButtonDisabledState();
  }

  setAllItemsCheckedState(checked): void {
    for (const checkbox of this.getAllCheckboxes()) {
      checkbox.checked = checked;
    }
  }

  getCheckboxDomElements() {
    const listParentElem =
      this.currentFolder.is_sharedfolder ?
      this.textListElem : this.folderListElem;
    const listElem = listParentElem.nativeElement.querySelector('ion-list');
    const checkboxes = listElem.querySelectorAll('.selectCheckbox');
    return checkboxes;
  }

  deleteSelectedItems(): Observable<object> {
    const checkboxes = this.getCheckboxDomElements();
    const listParentElem =
      this.currentFolder.is_sharedfolder ?
      this.textListElem : this.folderListElem;
    const listElem = listParentElem.nativeElement.querySelector('ion-list');
    const dataList =
      this.currentFolder.is_sharedfolder ? this.texts : this.subfolders;
    const idsToDelete = [];
    for (const checkbox of checkboxes) {
      const li = checkbox.parentNode;
      if (checkbox.checked) {
        const index = Array.prototype.indexOf.call(listElem.childNodes, li);
        const id = dataList[index].id;
        idsToDelete.push(id);
      }
    }

    this.toggleMultiSelect();

    if (this.currentFolder.is_sharedfolder) {
      return this.manageFolderService.deleteTexts(idsToDelete);
    } else {
      return this.manageFolderService.deleteFolders(idsToDelete);
    }

  }

  updateDeleteButtonDisabledState() {
    const checkboxes = this.getCheckboxDomElements();
    let disabled = true;
    for (const checkbox of checkboxes) {
      if (checkbox.checked) {
        disabled = false;
      }
    }
    this.deleteSelectionButtonDisabled = disabled;
  }

  async openDeleteSelectedItemsModal(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Attention!',
      message: `Do you really want to delete all selected items?`,
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: async (): Promise<void> => {
            this.deleteSelectedItems()
                .subscribe(
                    () => this.getFolderInfo(),
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

  async openDeleteFolderAlert($event, folder): Promise<void> {
    // cancel click event to prevent opening the folder
    $event.preventDefault();
    $event.stopPropagation();

    this.manageFolderUIService.openDeleteFolderAlert(folder, () => {
      this.getFolderInfo();
    });
  }

  openAddListenerModal(): void {
    this.manageFolderUIService.openAddListenerModal(this.currentFolder);
  }

  openFolderStatsModal(): void {
    this.manageFolderUIService.openFolderStatsModal(this.currentFolder);
  }

  /*downloadFolder(): void {
    this.manageFolderService.downloadFolder(this.currentFolder);
  }*/

  openCreateTextModal(): void {
    this.manageTextUIService.openCreateTextModal(
        this.currentFolder, this.texts, () => {
          if (!this.currentFolder.is_sharedfolder) {
            this.currentFolder.is_sharedfolder = true;
            this.textListElem.nativeElement.classList.add('loaded');
          }
          this.initTexts();
        });
  }

  openDeleteTextAlert($event, text): void {
    // cancel click event to prevent opening the text
    $event.preventDefault();
    $event.stopPropagation();
    this.manageTextUIService.openDeleteTextAlert(text, () => {
      this.initTexts();
    });
  }

  initTexts(): void {
    this.manageTextUIService.initTextList(this.currentFolder, (texts) => {
      this.texts = texts;
    });
  }

  /*downloadstatistics(): void {
    this.statisticsService.downloadstatistics().subscribe((blob) => {
      saveAs(blob, 'statistics.csv');
    });
  }*/

  async presentDownloadSelect(ev: any): Promise<void> {
    return this.manageFolderUIService.presentDownloadSelect(ev, this.currentFolder)
  }

  async createLink($event, folder): Promise<void> {
    $event.preventDefault();
    $event.stopPropagation();
    const link = `${location.protocol}//` +
      `${location.host}/tabs/speak/link/${folder.id}?root=${folder.uid}`;
    navigator.clipboard.writeText(link);
    const toast = await this.toastController.create({
      message: 'The link was copied to your clipboard!',
      icon: 'checkmark',
      color: 'success',
      position: 'bottom',
      animated: true,
      duration: 1000,
    });
    await toast.present();
  }
}
