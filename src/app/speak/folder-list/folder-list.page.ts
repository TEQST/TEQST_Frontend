import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';
import { AlertManagerService } from 'src/app/services/alert-manager.service';


@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.page.html',
  styleUrls: ['./folder-list.page.scss'],
})

export class FolderListPage implements OnInit {

  public publisherId: string
  public folders: any
  publisherName: any;

  constructor(private navService : SpeakTabNavService,
              private route: ActivatedRoute,
              private alertManager: AlertManagerService) {

    this.publisherId = ''
  }

  ngOnInit() {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId')
  }
  
  async ionViewWillEnter() {
    await this.alertManager.hideLoadingSpinner()

    this.navService.getInfoForPublisher(this.publisherId)
      .pipe(
        finalize(async () => { await this.alertManager.hideLoadingSpinner() })
      )
      .subscribe(
        data => {
          this.publisherName = data['username']
          this.folders = data['freedfolders']
        },
        err => this.alertManager.showErrorAlert(err.status, err.statusText)
      )
  }

}
