import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';
import { PopupNotifier } from 'src/app/popupNotifier/popup-notifier';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})

export class TextListPage implements OnInit {

  private publisherId: string
  private folderId: string
  private texts: any

  constructor(private navService : SpeakTabNavService,
              private route: ActivatedRoute,
              private popupNotifer: PopupNotifier) {

    this.publisherId = ''
  }

  ngOnInit() {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId')
    this.folderId    = this.route.snapshot.paramMap.get('folderId')
  }
  
  async ionViewWillEnter() {
    await this.popupNotifer.showLoadingSpinner()

    this.navService.getTextsByFolderId(this.folderId)
      .pipe(
        finalize(async () => { await this.popupNotifer.hideLoadingSpinner() })
      )
      .subscribe(
        data => {
          this.texts = data
        },
        err => this.popupNotifer.showErrorAlert(err.status, err.statusText)
      )
  }

}
