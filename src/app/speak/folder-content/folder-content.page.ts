import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {SpeakTabNavService} from 'src/app/services/speak-tab-nav.service';
import {BaseComponent} from 'src/app/base-component';
import {LoaderService} from 'src/app/services/loader.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Folder} from 'src/app/speak/speak.folder';
import {ModalController} from '@ionic/angular';
import {TimeStatsComponent} from '../time-stats/time-stats.component';

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
  private folderName: string
  private timestats = [];

  constructor(private navService : SpeakTabNavService,
              public loaderService: LoaderService,
              private router: Router,
              private route: ActivatedRoute,
              private modalController: ModalController) {
    super(loaderService);

    this.subfolders = [];
    this.canGoBack = false;
    this.current_id = 'asdf';
  }

  ngOnInit(): void {
    this.current_id = this.route.snapshot.paramMap.get('folderUid');
    this.root_uid = this.route.snapshot.queryParamMap.get('root');

    if (this.current_id == null || this.root_uid == null) {
      this.router.navigateByUrl('/tabs/speak');
    }
  }

  ionViewWillEnter(): void {
    // TODO: make a check here for the validity of the id and root id
    //       and navigate to recent links if they're invalid
    this.loadCurrentFolder();
    this.folderListElem.nativeElement.classList.add('loaded');
    this.textListElem.nativeElement.classList.add('loaded');
  }

  loadCurrentFolder(): void {
    if (this.current_id == null || this.root_uid == null) {
      this.router.navigateByUrl('/tabs/speak/recent-links');
    }
    this.navService.getFolderInfo(this.current_id, this.root_uid).subscribe(
        (res) => {
          this.currentFolder = new Folder(
              res['id'], res['name'], res['parent']);
          this.canGoBack = res['parent'] == null ? false : true;
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
  }

  loadTexts(): void {
    this.navService.loadContentsOfSharedFolder(
        this.current_id, this.root_uid).subscribe((res) => {
      this.folderName = res['name'];
      this.timestats = res['timestats'];
      this.texts = res['texts'];
    });
  }

  async presentTimeStats(): Promise<void> {
    const popover = await this.modalController.create({
      component: TimeStatsComponent,
      componentProps: {
        timestats: this.timestats,
        folderName: this.folderName,
      },
    });
    return await popover.present();
  }

  // Truncate number to the specified amount of decimal places
  truncateNumber(num, fixed): string {
    const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
  }

}
