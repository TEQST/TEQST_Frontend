import { TimeStatsComponent } from './time-stats/time-stats.component';
import { SharedFolder } from './../../../interfaces/shared-folder';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';
import { AlertManagerService } from 'src/app/services/alert-manager.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})

export class TextListPage implements OnInit {

  public publisherId: string;
  public folderId: string;
  public texts: any;
  folderName: any;
  public isLoading = false;
  public sharedFolderData: SharedFolder;

  constructor(private navService: SpeakTabNavService,
              private route: ActivatedRoute,
              private alertManager: AlertManagerService,
              private loaderService: LoaderService,
              private modalController: ModalController) {
    this.loaderService.getIsLoading().subscribe((isLoading) => this.isLoading = isLoading);
    this.publisherId = '';
    this.texts = [];
  }

  ngOnInit() {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId');
    this.folderId    = this.route.snapshot.paramMap.get('folderId');
  }

  async ionViewWillEnter() {
    this.navService.getInfoForSharedfolder(this.folderId)
      .subscribe(
        data => {
          this.sharedFolderData = data;
          this.folderName = data.name;
          this.texts = data.texts;
        },
        err => this.alertManager.showErrorAlert(err.status, err.statusText)
      );
  }

  async presentTimeStats() {
    const popover = await this.modalController.create({
      component: TimeStatsComponent,
      componentProps: {
        timestats: this.sharedFolderData.timestats,
        folderName: this.sharedFolderData.name
      },
    });
    return await popover.present();
  }

}
