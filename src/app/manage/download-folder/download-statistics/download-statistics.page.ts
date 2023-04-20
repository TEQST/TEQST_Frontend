import { Component, OnInit, ViewChild } from '@angular/core';
import { IonNav, ModalController } from '@ionic/angular';
import { DownloadBasicComponent } from './download-basic/download-basic.component';

@Component({
  selector: 'app-download-statistics',
  templateUrl: './download-statistics.page.html',
  styleUrls: ['./download-statistics.page.scss'],
})
export class DownloadStatisticsPage implements OnInit {

  @ViewChild('navComponent') navComponent: IonNav;

  constructor(
    private viewCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.navComponent.push(DownloadBasicComponent, {
      navComponent: this.navComponent,
    });
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
