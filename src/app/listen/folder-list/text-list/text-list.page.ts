import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {SharedFolder} from 'src/app/interfaces/shared-folder';
import {ListenerService} from 'src/app/services/listener.service';
import {LoaderService} from 'src/app/services/loader.service';
import {SpeakTabNavService} from 'src/app/services/speak-tab-nav.service';
import {TimeStatsComponent}
  from 'src/app/speak/folder-list/text-list/time-stats/time-stats.component';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})
export class TextListPage implements OnInit {

  @ViewChild('textList', {read: ElementRef}) textListElem: ElementRef

  public publisherId: string;
  public folderId: string;
  public texts: any;
  folderName: any;
  public isLoading = false;
  public sharedFolderData: SharedFolder;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private loaderService: LoaderService,
              private modalController: ModalController,
              private listenerService: ListenerService) {

    const routeParams = this.router.getCurrentNavigation().extras.state;
    if (typeof routeParams !== 'undefined' && 'folderName' in routeParams) {
      this.folderName = routeParams.folderName;
    }
    this.loaderService.getIsLoading()
        .subscribe((isLoading) => this.isLoading = isLoading);

    this.publisherId = '';
    this.texts = [];

    this.listenerService.sharedTextsList.subscribe((data) => {
      this.sharedFolderData = data;
      this.folderName = data.name;
      this.texts = data.texts;
      this.textListElem.nativeElement.classList.add('loaded');
    });
    // clear contents when data is being refreshed
    this.listenerService.requestMade.subscribe((_) => {
      this.texts = [];
      this.textListElem.nativeElement.classList.remove('loaded');
    });
  }

  ngOnInit() {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId');
    this.folderId = this.route.snapshot.paramMap.get('folderId');
  }

  async ionViewWillEnter() {
    this.listenerService.loadContentsOfSharedFolder(this.folderId);
  }

  async presentTimeStats() {
    const popover = await this.modalController.create({
      component: TimeStatsComponent,
      componentProps: {
        timestats: this.sharedFolderData.timestats,
        folderName: this.sharedFolderData.name,
      },
    });
    return await popover.present();
  }

}
