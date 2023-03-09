import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';

import {BaseComponent} from 'src/app/base-component';
import {FolderDetail} from 'src/app/interfaces/folder-detail';
import {TextBasic} from 'src/app/interfaces/text-basic';
import {FolderStatsPage} from 'src/app/manage/folder-stats/folder-stats.page';
import {ListenerService} from 'src/app/services/listener.service';
import {LoaderService} from 'src/app/services/loader.service';

@Component({
  selector: 'app-listen-manage',
  templateUrl: './listen-manage.page.html',
  styleUrls: ['./listen-manage.page.scss'],
})
export class ListenManagePage extends BaseComponent implements OnInit {

  @ViewChild('folderList', {read: ElementRef}) folderList: ElementRef;
  @ViewChild('textList', {read: ElementRef}) textList: ElementRef;

  public currentFolder: FolderDetail;
  public texts: TextBasic[];

  private currentFolderId: string;

  constructor(public loaderService: LoaderService,
              private listenerService: ListenerService,
              private route: ActivatedRoute,
              private modalController: ModalController) {

    super(loaderService);
    this.currentFolder = {
      id: 0,
      name: '',
      owner: 0,
      parent: 0,
      subfolder: [],
      is_sharedfolder: false,
    };
    this.texts = [];
  }

  ngOnInit(): void {
    this.currentFolderId = this.route.snapshot.paramMap.get('folderId');
    this.loadFolderInfo();
  }

  async loadFolderInfo(): Promise<void> {
    this.listenerService.getFolderDetail(this.currentFolderId).subscribe(
        (res) => {
          this.currentFolder = res;
          this.folderList.nativeElement.classList.add('loaded');
          if (this.currentFolder.is_sharedfolder) {
            this.loadTexts();
          }
        }, (err) => {
          alert(err);
        },
    );
  }

  async loadTexts(): Promise<void> {
    this.listenerService.loadContentsOfSharedFolder(this.currentFolderId)
        .subscribe((res) => {
          this.texts = res['texts'];
        }, (err) => {
          alert(err);
        });
  }

  async openFolderStatsModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: FolderStatsPage,
      componentProps: {
        folderId: this.currentFolder.id,
        folderName: this.currentFolder.name,
        role: 'lstn',
      },
    });
    return await modal.present();
  }

}
