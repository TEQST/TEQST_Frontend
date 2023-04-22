import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonNav, ModalController, NavParams } from '@ionic/angular';
import { TimeframeService } from '../timeframe.service';
import { DownloadAdvancedComponent } from '../download-advanced/download-advanced.component';

@Component({
  selector: 'app-download-basic',
  templateUrl: './download-basic.component.html',
  styleUrls: ['./download-basic.component.scss'],
})
export class DownloadBasicComponent implements OnInit {

  public navComponent: IonNav;

  public get curMonth() {
    return this.timeframeService.getMonth();
  }

  public set curMonth(value: string) {
    this.timeframeService.setMonth(value);
  }

  constructor(public navParams: NavParams,
    private timeframeService: TimeframeService,
    private viewCtrl: ModalController) {
    this.navComponent = navParams.get('navComponent');
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.timeframeService.setBasic();
  }

  toAdvanced() {
    console.log("Nav to Advanced")
    this.navComponent.push(DownloadAdvancedComponent, {
      navComponent: this.navComponent,
    });
  }

}
