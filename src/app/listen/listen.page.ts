import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../base-component';
import {AlertManagerService} from '../services/alert-manager.service';
import {ListenerService} from '../services/listener.service';
import {LoaderService} from '../services/loader.service';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.page.html',
  styleUrls: ['./listen.page.scss'],
})
export class ListenPage extends BaseComponent implements OnInit {
  @ViewChild('publisherList', {read: ElementRef}) publisherListElem: ElementRef

  public publishers: any

  constructor(private alertManager: AlertManagerService,
              public loaderService: LoaderService,
              private listenerService: ListenerService) {
    super(loaderService);
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.publishers = [];
    this.publisherListElem.nativeElement.classList.remove('loaded');

    await this.listenerService.getPublisherList()
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
