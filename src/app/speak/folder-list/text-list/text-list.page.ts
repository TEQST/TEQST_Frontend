import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';
import { AlertManagerService } from 'src/app/services/alert-manager.service';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})

export class TextListPage implements OnInit {

  public publisherId: string
  public folderId: string
  public texts: any
  folderName: any;

  constructor(private navService : SpeakTabNavService,
              private route: ActivatedRoute,
              private alertManager: AlertManagerService) {

    this.publisherId = ''
  }

  ngOnInit() {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId')
    this.folderId    = this.route.snapshot.paramMap.get('folderId')
  }
  
  async ionViewWillEnter() {
    await this.alertManager.showLoadingSpinner()

    this.navService.getInfoForSharedfolder(this.folderId)
      .pipe(
        finalize(async () => { await this.alertManager.hideLoadingSpinner() })
      )
      .subscribe(
        data => {
          this.folderName = data['name']
          this.texts = data['texts']
        },
        err => this.alertManager.showErrorAlert(err.status, err.statusText)
      )
  }

}
