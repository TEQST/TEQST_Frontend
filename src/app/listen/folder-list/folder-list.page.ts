import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertManagerService } from 'src/app/services/alert-manager.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.page.html',
  styleUrls: ['./folder-list.page.scss'],
})
export class FolderListPage implements OnInit {
  @ViewChild('folderList', {read: ElementRef}) folderListElem: ElementRef

  public publisherId: string
  public folders: any
  publisherName: any;
  public isLoading = false;

  constructor(
    private navService : SpeakTabNavService,
    private router: Router,
    private route: ActivatedRoute,
    private alertManager: AlertManagerService,
    private loaderService: LoaderService) {

    const routeParams = this.router.getCurrentNavigation().extras.state;
    if (typeof routeParams !== 'undefined' && 'publisherName' in routeParams) {
      this.publisherName = routeParams.publisherName;
    }
    this.loaderService.getIsLoading()
        .subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnInit() {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId');
  }

  async ionViewWillEnter() {
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
