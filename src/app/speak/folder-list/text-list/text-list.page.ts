import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';
import { finalize } from 'rxjs/operators';
import { PopupNotifier } from 'src/app/popupNotifier/popup-notifier';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})

export class TextListPage implements OnInit {

  publisherId = null
  folderId: string
  texts: any

  constructor(private navService : SpeakTabNavService,
              private route: ActivatedRoute,
              private popupNotifer: PopupNotifier) { }

  ngOnInit() {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId');
    this.folderId = this.route.snapshot.paramMap.get('folderId');
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
      );
  }

}
