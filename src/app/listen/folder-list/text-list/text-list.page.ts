import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {takeUntil} from 'rxjs/operators';

import {BaseComponent} from 'src/app/base-component';
import {SharedFolder} from 'src/app/interfaces/shared-folder';
import {ListenerService} from 'src/app/services/listener.service';
import {LoaderService} from 'src/app/services/loader.service';
import {TimeStatsComponent}
  from 'src/app/speak/folder-list/text-list/time-stats/time-stats.component';

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
  public sharedFolderData: SharedFolder;
  folderName: any;

  constructor(public loaderService: LoaderService,
              private router: Router,
              private route: ActivatedRoute,
              private modalController: ModalController,
              private listenerService: ListenerService) {
    super(loaderService);
    const routeParams = this.router.getCurrentNavigation().extras.state;
    if (typeof routeParams !== 'undefined' && 'folderName' in routeParams) {
      this.folderName = routeParams.folderName;
    }
    this.publisherId = '';
    this.texts = [];

    this.listenerService.sharedTextsList.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => {
          this.sharedFolderData = data;
          this.folderName = data.name;
          this.texts = data.texts;
          this.textListElem.nativeElement.classList.add('loaded');
        });
    // clear contents when data is being refreshed
    this.listenerService.requestMade.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.texts = [];
          this.textListElem.nativeElement.classList.remove('loaded');
        });
  }

  ngOnInit(): void {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId');
    this.folderId = this.route.snapshot.paramMap.get('folderId');
  }

  async ionViewWillEnter(): Promise<void> {
    this.listenerService.loadContentsOfSharedFolder(this.folderId);
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

}