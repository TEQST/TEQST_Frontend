import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/user';
import { ListenerService } from '../services/listener.service';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.page.html',
  styleUrls: ['./listen.page.scss'],
})
export class ListenPage implements OnInit {
  @ViewChild('publisherList', {read: ElementRef}) publisherListElem: ElementRef
  private publishers

  constructor(private listenerService: ListenerService) { }

  async ngOnInit() {
    await this.listenerService.getPublishers()
    .toPromise()
    .then((publishers) => {
        this.publishers = publishers
        this.publisherListElem.nativeElement.classList.add('loaded');
    })
  }

}
