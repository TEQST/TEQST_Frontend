import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {SpeakTabNavService} from 'src/app/services/speak-tab-nav.service';
import {BaseComponent} from '../base-component';
import {AlertManagerService} from '../services/alert-manager.service';
import {LoaderService} from '../services/loader.service';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.page.html',
  styleUrls: ['./speak.page.scss'],
})

export class SpeakPage extends BaseComponent implements OnInit {

  @ViewChild('publisherList', {read: ElementRef}) publisherListElem: ElementRef

  public publishers: any

  constructor(private navService : SpeakTabNavService,
              private alertManager: AlertManagerService,
              public loaderService: LoaderService) {
    super(loaderService);
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.publishers = [];
    this.publisherListElem.nativeElement.classList.remove('loaded');

    this.navService.getPublisherList()
        .subscribe(
            (data) => {
              this.publishers = data;
              this.publisherListElem.nativeElement.classList.add('loaded');
            },
            (err) => this.alertManager
                .showErrorAlert(err.status, err.statusText),
        );
  }
}
