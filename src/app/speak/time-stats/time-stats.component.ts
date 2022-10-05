import {Component, OnInit} from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';

import {TimeStats} from 'src/app/interfaces/time-stats';
import {TimeFormatService} from 'src/app/services/time-format.service';

@Component({
  selector: 'app-time-stats',
  templateUrl: './time-stats.component.html',
  styleUrls: ['./time-stats.component.scss'],
})
export class TimeStatsComponent implements OnInit {

  public timeStats: TimeStats;
  public folderName: string;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    public timeFormat: TimeFormatService) { }

  ngOnInit(): void {
    this.timeStats = this.navParams.data.timestats;
    this.folderName = this.navParams.data.folderName;
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

}
