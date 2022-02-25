import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SpeakTabNavService} from 'src/app/services/speak-tab-nav.service';
import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {LoaderService} from 'src/app/services/loader.service';
import {BaseComponent} from 'src/app/base-component';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.page.html',
  styleUrls: ['./folder-list.page.scss'],
})

export class FolderListPage extends BaseComponent implements OnInit {

  @ViewChild('folderList', {read: ElementRef}) folderListElem: ElementRef

  public publisherId: string
  public folders: any
  publisherName: any;

  constructor(
    private navService : SpeakTabNavService,
    private router: Router,
    private route: ActivatedRoute,
    private alertManager: AlertManagerService,
    public loaderService: LoaderService) {

    super(loaderService);

    const routeParams = this.router.getCurrentNavigation().extras.state;
    if (typeof routeParams !== 'undefined' && 'publisherName' in routeParams) {
      this.publisherName = routeParams.publisherName;
    }
  }

  ngOnInit(): void {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId');
  }

  async ionViewWillEnter(): Promise<void> {
    this.folders = [];
    this.folderListElem.nativeElement.classList.remove('loaded');

    if (this.publisherId == 'public') {
      this.navService.getPublicFolders()
          .subscribe(
              (data) => {
                this.folders = data;
                this.folderListElem.nativeElement.classList.add('loaded');
              },
              (err) => this.alertManager
                  .showErrorAlert(err.status, err.statusText),
          );
    } else {
      this.navService.getInfoForPublisher(this.publisherId)
          .subscribe(
              (data) => {
                this.publisherName = data['username'];
                this.folders = data['freedfolders'];
                this.folderListElem.nativeElement.classList.add('loaded');
              },
              (err) => this.alertManager
                  .showErrorAlert(err.status, err.statusText),
          );
    }
  }

}
