import { TimeStats } from './../../../../interfaces/time-stats';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-time-stats',
  templateUrl: './time-stats.component.html',
  styleUrls: ['./time-stats.component.scss'],
})
export class TimeStatsComponent implements OnInit {

  public timeStats: TimeStats;
  public folderName: string;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.timeStats = this.navParams.data.timestats;
    this.folderName =  this.navParams.data.folderName;
    console.log(this.timeStats.rec_time_with_rep)
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
