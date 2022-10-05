import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {SpeakTabNavService} from 'src/app/services/speak-tab-nav.service';
import {BaseComponent} from 'src/app/base-component';
import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {LoaderService} from 'src/app/services/loader.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Folder} from 'src/app/speak/speak.folder';
import {Location} from '@angular/common';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-folder-content',
  templateUrl: './folder-content.page.html',
  styleUrls: ['./folder-content.page.scss'],
})

export class FolderContentPage extends BaseComponent implements OnInit {

  @ViewChild('folderList', {read: ElementRef}) folderListElem: ElementRef
  @ViewChild('textList', {read: ElementRef}) textListElem: ElementRef

  // public publishers: any
  public currentFolder: Folder = new Folder('', 'Folder', null)
  public subfolders: Folder[] = [];
  public texts: Text[] = [];
  public root_uid: string;
  public current_id = 'asdf';
  public canGoBack: boolean;
  private defaultId: string;
  private defaultRootId: string;

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
    this.current_id = 'asdf';
    this.defaultId = Constants.DEFAULT_ID;
    this.defaultRootId = Constants.DEFAULT_ROOT_ID;
  }

  ngOnInit(): void {
    // test: 5?root=fcc6fa34-5f49-4d4d-855a-d98f13b63465
    this.current_id = this.route.snapshot.paramMap.get('folderUid');
    this.root_uid = this.route.snapshot.queryParamMap.get('root');
    console.log('current uid');
    console.log(this.current_id);
    console.log('root uid');
    console.log(this.root_uid);

    // if (this.current_id == null) {
    //   if (this.root_uid != null) {
    //     this.current_id = this.root_uid;
    //   } else {
    //     // TODO: load root folder and adjust url
    //   }
    // }
    if (this.current_id == null || this.root_uid == null) {
      // console.log('GONNA REDIRECT');
      // this.router.navigateByUrl(
      //  '/tabs/speak/link/' + this.defaultId + '?root=' + this.defaultRootId);
      this.router.navigateByUrl('/tabs/speak/recent-links');
    }
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
    // TODO: make a check here for the validity of the id and root id
    //       and navigate to recent links if they're invalid
    this.loadCurrentFolder();
    this.folderListElem.nativeElement.classList.add('loaded');
    this.textListElem.nativeElement.classList.add('loaded');
  }

  loadCurrentFolder() {
    console.log('making request with');
    console.log(this.current_id);
    console.log(this.root_uid);
    if (this.current_id == null || this.root_uid == null) {
      this.router.navigateByUrl('/tabs/speak/recent-links');
    }
    this.navService.getFolderInfo(this.current_id, this.root_uid).subscribe(
        (res) => {
          console.log(res);
          this.currentFolder = new Folder(
              res['id'], res['name'], res['parent']);
          this.canGoBack = res['parent'] == null ? false : true;
          console.log(this.canGoBack)
          if (res['subfolder'].length == 0) {
            this.loadTexts();
            return;
          }
          this.subfolders = res['subfolder'].map((f) => {
            return new Folder(f.id, f.name, this.current_id);
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
        this.current_id, this.root_uid).subscribe((res) => {
      console.log('load texts')
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
