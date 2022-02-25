import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

import {TimeStatsComponent} from './time-stats/time-stats.component';
import {SharedFolder} from 'src/app/interfaces/shared-folder';
import {SpeakTabNavService} from 'src/app/services/speak-tab-nav.service';
import {LoaderService} from 'src/app/services/loader.service';
import {BaseComponent} from 'src/app/base-component';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})

export class TextListPage extends BaseComponent implements OnInit {

  @ViewChild('textList', {read: ElementRef}) textListElem: ElementRef

  public publisherId: string;
  public folderId: string;
  public texts: any;
  folderName: any;
  public sharedFolderData: SharedFolder;

  constructor(private navService: SpeakTabNavService,
              private router: Router,
              private route: ActivatedRoute,
              public loaderService: LoaderService,
              private modalController: ModalController) {

    super(loaderService);

    const routeParams = this.router.getCurrentNavigation().extras.state;
    if (typeof routeParams !== 'undefined' && 'folderName' in routeParams) {
      this.folderName = routeParams.folderName;
    }
    this.publisherId = '';
    this.texts = [];
    this.navService.sharedTextsList.subscribe((data) => {
      this.sharedFolderData = data;
      this.folderName = data.name;
      this.texts = data.texts;
      this.textListElem.nativeElement.classList.add('loaded');
    });
    // clear contents when data is being refreshed
    this.navService.requestMade.subscribe(() => {
      this.texts = [];
      this.textListElem.nativeElement.classList.remove('loaded');
    });
  }

  ngOnInit(): void {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId');
    this.folderId = this.route.snapshot.paramMap.get('folderId');
  }

  async ionViewWillEnter(): Promise<void> {
    this.navService.loadContentsOfSharedFolder(this.folderId);
  }

  async presentTimeStats(): Promise<void> {
    const popover = await this.modalController.create({
      component: TimeStatsComponent,
      componentProps: {
        timestats: this.sharedFolderData.timestats,
        folderName: this.sharedFolderData.name,
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
