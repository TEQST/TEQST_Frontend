import {Component, ElementRef, ViewChild}
  from '@angular/core';
import {BaseComponent} from 'src/app/base-component';

import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {ListenerService} from 'src/app/services/listener.service';
import {LoaderService} from 'src/app/services/loader.service';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.page.html',
  styleUrls: ['./listen.page.scss'],
})
export class ListenPage extends BaseComponent {
  @ViewChild('folderList', {read: ElementRef}) folderListElem: ElementRef

  public folders: any;

  constructor(
    public loaderService: LoaderService,
    private alertManager: AlertManagerService,
    private listenerService: ListenerService) {

    super(loaderService);
  }

  async ionViewWillEnter(): Promise<void> {
    this.folders = [];
    this.folderListElem.nativeElement.classList.remove('loaded');

    this.listenerService.getSharedFolders()
        .subscribe(
            (data) => {
              this.folders = data;
              this.folderListElem.nativeElement.classList.add('loaded');
            },
            (err) => this.alertManager
                .showErrorAlert(err.status, err.statusText),
        );
  }

}
