import {LoaderService} from './../services/loader.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ManageFolderService} from 'src/app/services/manage-folder.service';
import {Folder} from './manage.folder';
import {Text} from './manage.text';
import {AlertManagerService} from '../services/alert-manager.service';
import { ManageFolderUIService } from './manage-folder-ui.service';
import { ManageTextUIService } from './manage-text-ui.service';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})

export class ManagePage implements OnInit {

  @ViewChild('textList', {read: ElementRef}) textListElem: ElementRef
  @ViewChild('folderList', {read: ElementRef}) folderListElem: ElementRef

  public currentFolder: Folder
  public subfolders: Folder[]
  public texts: Text[]
  public isLoading = false;
  public username: string

  constructor(private manageFolderService: ManageFolderService,
              private manageFolderUIService: ManageFolderUIService,
              private manageTextUIService: ManageTextUIService,
              private router: Router,
              private route: ActivatedRoute,
              private alertManager: AlertManagerService,
              private loaderService: LoaderService) {

    Folder.setServiceProvider(manageFolderService);
    Text.setServiceProvider(manageFolderService);

    this.username = localStorage.getItem('username');
    this.currentFolder = new Folder(null, '', false);

    const routeParams = this.router.getCurrentNavigation().extras.state;
    if (typeof routeParams !== 'undefined' && 'folderName' in routeParams) {
      this.currentFolder.name = routeParams.folderName;
    }

    this.subfolders = [];
    this.texts = [];
    this.loaderService.getIsLoading()
        .subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnInit() {}

  async ionViewWillEnter() {
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

  async getFolderInfo() {
    this.currentFolder.getSubfolderList()
        .subscribe(
            (data) => {
              if (Array.isArray(data)) {
                /* on the topmost filesystem level
                   only an array of folders exist */
                this.subfolders = this.manageFolderUIService.initSubfolderList(data);
                this.folderListElem.nativeElement.classList.add('loaded');
              } else {
                // get information about the current folder
                this.currentFolder.name = data['name'];
                this.currentFolder.is_sharedfolder = data['is_sharedfolder'];
                const subfolderInfo = data['subfolder'];

                if (this.currentFolder.is_sharedfolder) {
                  this.manageTextUIService.initTextList(this.currentFolder, (texts) => {
                    this.texts = texts;
                    this.textListElem.nativeElement.classList.add('loaded');
                  });
                } else {
                  this.subfolders = this.manageFolderUIService.initSubfolderList(subfolderInfo);
                  this.folderListElem.nativeElement.classList.add('loaded');
                }
              }
            },
            (err) => this.alertManager.showErrorAlert(
                err.status, err.statusText, '/manage'),
        );
  }

  openCreateFolderModal() {
    this.manageFolderUIService.openCreateFolderModal(this.currentFolder, this.subfolders, () => this.getFolderInfo())
  }

  openDeleteFolderAlert($event, folder) {
    // cancel click event to prevent opening the folder
    $event.preventDefault();
    $event.stopPropagation();

    this.manageFolderUIService.openDeleteFolderAlert(folder, () => this.getFolderInfo());
  }

  openShareFolderModal() {
    this.manageFolderUIService.openShareFolderModal(this.currentFolder);
  }

  openFolderStatsModal() {
    this.manageFolderUIService.openFolderStatsModal(this.currentFolder);
  }

  downloadFolder() {
    this.manageFolderService.downloadFolder(this.currentFolder);
  }

  openCreateTextModal() {
    this.manageTextUIService.openCreateTextModal(this.currentFolder, this.texts, () => {
      if (!this.currentFolder.is_sharedfolder) {
        this.currentFolder.is_sharedfolder = true;
        this.textListElem.nativeElement.classList.add('loaded');
      }
      this.initTexts();
    });
  }

  openDeleteTextAlert($event, text) {
    // cancel click event to prevent opening the text
    $event.preventDefault();
    $event.stopPropagation();
    this.manageTextUIService.openDeleteTextAlert(text, () => {
      this.initTexts();
    })
  }

  initTexts() {
    this.manageTextUIService.initTextList(this.currentFolder, (texts) => {
      this.texts = texts;
    });
  }

}
