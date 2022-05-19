import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {SpeakTabNavService} from 'src/app/services/speak-tab-nav.service';
import {BaseComponent} from '../base-component';
import {AlertManagerService} from '../services/alert-manager.service';
import {LoaderService} from '../services/loader.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Folder} from './speak.folder';
import {Location} from '@angular/common';
import { ModalController } from '@ionic/angular';
import { TimeStatsComponent } from './folder-list/text-list/time-stats/time-stats.component';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.page.html',
  styleUrls: ['./speak.page.scss'],
})

export class SpeakPage extends BaseComponent implements OnInit {

  @ViewChild('folderList', {read: ElementRef}) folderListElem: ElementRef

  // public publishers: any
  public currentFolder: Folder
  public subfolders: Folder[]
  public texts: Text[]
  public root_uid: string;
  public current_uid: string;
  public canGoBack: boolean;
  

  constructor(private navService : SpeakTabNavService,
              private alertManager: AlertManagerService,
              public loaderService: LoaderService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private modalController: ModalController) {
    super(loaderService);

    this.subfolders = [];
    this.canGoBack = false;
  }

  ngOnInit(): void {
    this.current_uid = this.route.snapshot.paramMap.get('folderUid');
    this.root_uid = this.route.snapshot.queryParamMap.get('r');
    console.log(this.root_uid);
    if (this.root_uid == null) {
      this.root_uid = '00000';
      this.current_uid = this.root_uid;
      const url = this.router.createUrlTree(
          [`tabs/speak/${this.current_uid}`],
          {queryParams: {r: this.root_uid}},
      ).toString();
      this.location.go(url);
    }
  }

  ionViewWillEnter(): void {
    this.loadCurrentFolder();
    this.folderListElem.nativeElement.classList.add('loaded');
  }

  loadCurrentFolder() {
    console.log('load');
    this.canGoBack = true;
    this.currentFolder = new Folder(this.current_uid, '');
    console.log(this.current_uid);
    if (this.current_uid == 'asdf') {
      this.subfolders = [
        new Folder('8df98s0r', 'Kindergeschichten'),
        new Folder('asdf678', 'Jugendgeschichten'),
      ];
    } else {
      this.subfolders = [
        new Folder('asdf', 'Romane'),
      ];
    }
  }

  // async presentTimeStats(): Promise<void> {
  //   const popover = await this.modalController.create({
  //     component: TimeStatsComponent,
  //     componentProps: {
  //       timestats: this.sharedFolderData.timestats,
  //       folderName: this.sharedFolderData.name,
  //     },
  //   });
  //   return await popover.present();
  // }

  // Truncate number to the specified amount of decimal places
  truncateNumber(num, fixed): string {
    const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
  }

}
