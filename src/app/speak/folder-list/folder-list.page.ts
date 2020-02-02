import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';
import { finalize } from 'rxjs/operators';
import { PopupNotifier } from 'src/app/popupNotifier/popup-notifier';


@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.page.html',
  styleUrls: ['./folder-list.page.scss'],
})

export class FolderListPage implements OnInit {

  publisherId = null
  folders: any

  constructor(private navService : SpeakTabNavService,
              private route: ActivatedRoute,
              private popupNotifier: PopupNotifier) { }

  ngOnInit() {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId')
  }
  
  async ionViewWillEnter() {
    await this.popupNotifier.showLoadingSpinner()
    this.navService.getSharedFoldersByPublisher(this.publisherId)
      .pipe(
        finalize(async () => { await this.popupNotifier.hideLoadingSpinner() })
      )
      .subscribe(
        data => {
          this.folders = data
        },
        err => this.popupNotifier.showErrorAlert(err.status, err.statusText)
      )
  }

}
