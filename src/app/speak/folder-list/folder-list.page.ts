import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';
import { PopupNotifier } from 'src/app/popupNotifier/popup-notifier';


@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.page.html',
  styleUrls: ['./folder-list.page.scss'],
})

export class FolderListPage implements OnInit {

  private publisherId: string
  private folders: any
  publisherName: any;

  constructor(private navService : SpeakTabNavService,
              private route: ActivatedRoute,
              private popupNotifier: PopupNotifier) {

    this.publisherId = ''
  }

  ngOnInit() {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId')
  }
  
  async ionViewWillEnter() {
    await this.popupNotifier.showLoadingSpinner()

    this.navService.getInfoForPublisher(this.publisherId)
      .pipe(
        finalize(async () => { await this.popupNotifier.hideLoadingSpinner() })
      )
      .subscribe(
        data => {
          this.publisherName = data['username']
          this.folders = data['freedfolders']
        },
        err => this.popupNotifier.showErrorAlert(err.status, err.statusText)
      )
  }

}
