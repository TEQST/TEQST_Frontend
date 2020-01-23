import { Component, OnInit } from '@angular/core';
import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.page.html',
  styleUrls: ['./speak.page.scss'],
})
export class SpeakPage implements OnInit {
  publishers: { name: string; }[];

  constructor(private navService : SpeakTabNavService) { }

  ngOnInit() {
    this.publishers = this.navService.getPublishers()
  }

}
