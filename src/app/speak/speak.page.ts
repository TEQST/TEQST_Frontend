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
  @ViewChild('textList', {read: ElementRef}) textListElem: ElementRef

  // public publishers: any
  public currentFolder: Folder = new Folder('asdf', 'MYFolder', null)
  public subfolders: Folder[] = [];
  public texts: Text[] = [];
  public root_uid: string;
  public current_uid = 'asdf';
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
    this.current_uid = 'asdf';
  }

  ngOnInit(): void {
    // test: 5?root=fcc6fa34-5f49-4d4d-855a-d98f13b63465
    this.current_uid = this.route.snapshot.paramMap.get('folderUid');
    this.root_uid = this.route.snapshot.queryParamMap.get('root');
    console.log('current uid');
    console.log(this.current_uid);
    console.log('root uid');
    console.log(this.root_uid);

    if (this.current_uid == null) {
      if (this.root_uid != null) {
        this.current_uid = this.root_uid;
      } else {
        // TODO: load root folder and adjust url
      }
    }
    // if (this.current_uid == null || this.root_uid == null) {
    //   console.log('GONNA REDIRECT');
    //   this.router.navigateByUrl(
    //       '/tabs/speak/1?root=409b11ef-460f-4794-aeaf-d5e9a320e39e');
    // }
    // this.root_uid = this.route.snapshot.queryParamMap.get('root');
    // console.log(this.root_uid);
    // if (this.root_uid == null) {
    //   this.root_uid = '00000';
    //   this.current_uid = this.root_uid;
    //   const url = this.router.createUrlTree(
    //       [`tabs/speak/${this.current_uid}`],
    //       {queryParams: {root: this.root_uid}},
    //   ).toString();
    //   this.location.go(url);
    // }
  }

  ionViewWillEnter(): void {
    this.loadCurrentFolder();
    this.folderListElem.nativeElement.classList.add('loaded');
    this.textListElem.nativeElement.classList.add('loaded');
  }

  loadCurrentFolder() {
    console.log('making request with');
    console.log(this.current_uid);
    console.log(this.root_uid);
    this.navService.getFolderInfo(this.current_uid, this.root_uid).subscribe(
        (res) => {
          console.log(res);
          this.currentFolder = new Folder(
              res['id'], res['name'], res['parent']);
          this.canGoBack = res['parent'] == null ? false : true;
          if (res['subfolder'].length == 0) {
            this.loadTexts();
            return;
          }
          this.subfolders = res['subfolder'].map((f) => {
            return new Folder(f.id, f.name, this.current_uid);
          });
        },
        (err) => {
          console.log(err);
        },
    );
    console.log('load');
  }

  loadTexts() {
    this.navService.loadContentsOfSharedFolder(
        this.current_uid, this.root_uid).subscribe((res) => {
      console.log(res);
      this.texts = res['texts'];
    });
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
