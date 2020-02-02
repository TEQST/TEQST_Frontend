import { Component, OnInit } from '@angular/core';
import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';
import { finalize } from 'rxjs/operators';
import { PopupNotifier } from '../popupNotifier/popup-notifier';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.page.html',
  styleUrls: ['./speak.page.scss'],
})

export class SpeakPage implements OnInit {

  publishers: any

  constructor(private navService : SpeakTabNavService,
              private popupNotifier: PopupNotifier) { }
  
  ngOnInit() { }

  async ionViewWillEnter() {
    await this.popupNotifier.showLoadingSpinner()
    this.navService.getPublisherList()
      .pipe(
        finalize(async () => { await this.popupNotifier.hideLoadingSpinner() })
      )
      .subscribe(
        data => {
          this.publishers = data
        },
        err => this.popupNotifier.showErrorAlert(err.status, err.statusText)
      )
  }
}
