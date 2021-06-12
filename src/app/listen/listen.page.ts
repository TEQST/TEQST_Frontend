import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertManagerService} from '../services/alert-manager.service';
import {ListenerService} from '../services/listener.service';
import {LoaderService} from '../services/loader.service';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.page.html',
  styleUrls: ['./listen.page.scss'],
})
export class ListenPage implements OnInit {
  @ViewChild('publisherList', {read: ElementRef}) publisherListElem: ElementRef

  public publishers: any
  public isLoading = false;

  constructor(private alertManager: AlertManagerService,
              private loaderService: LoaderService,
              private listenerService: ListenerService) {
    this.loaderService.getIsLoading()
        .subscribe((isLoading) => this.isLoading = isLoading);
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
