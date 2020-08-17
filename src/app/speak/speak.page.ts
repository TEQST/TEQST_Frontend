import {Component, OnInit} from '@angular/core';

import {SpeakTabNavService} from 'src/app/services/speak-tab-nav.service';
import {AlertManagerService} from '../services/alert-manager.service';
import {LoaderService} from '../services/loader.service';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.page.html',
  styleUrls: ['./speak.page.scss'],
})

export class SpeakPage implements OnInit {

  public publishers: any
  public isLoading = false;

  constructor(private navService : SpeakTabNavService,
              private alertManager: AlertManagerService,
              private loaderService: LoaderService) {
    this.loaderService.getIsLoading()
        .subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.navService.getPublisherList()
        .subscribe(
            (data) => {
              this.publishers = data;
            },
            (err) => this.alertManager
                .showErrorAlert(err.status, err.statusText),
        );
  }
}
