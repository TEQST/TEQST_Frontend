import {Component, ElementRef, OnInit, ViewChild}
  from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from 'src/app/base-component';
import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {ListenerService} from 'src/app/services/listener.service';
import {LoaderService} from 'src/app/services/loader.service';
import {SpeakTabNavService} from 'src/app/services/speak-tab-nav.service';

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
    private router: Router,
    private route: ActivatedRoute,
    private alertManager: AlertManagerService,
    public loaderService: LoaderService,
    private listenerService: ListenerService) {
    super(loaderService);
    const routeParams = this.router.getCurrentNavigation().extras.state;
    if (typeof routeParams !== 'undefined' && 'publisherName' in routeParams) {
      this.publisherName = routeParams.publisherName;
    }
  }

  ngOnInit():void {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId');
  }

  async ionViewWillEnter() {
    this.folders = [];
    this.folderListElem.nativeElement.classList.remove('loaded');

    this.listenerService.getFoldersOfPublisher(this.publisherId)
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
