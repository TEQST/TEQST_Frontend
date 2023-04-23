import { Component, OnInit } from '@angular/core';
import { IonNav, ModalController, NavParams } from '@ionic/angular';
import { TimeframeService } from '../timeframe.service';
import { DownloadBasicComponent } from '../download-basic/download-basic.component';

@Component({
  selector: 'app-download-advanced',
  templateUrl: './download-advanced.component.html',
  styleUrls: ['./download-advanced.component.scss'],
})
export class DownloadAdvancedComponent implements OnInit {

  public navComponent: IonNav;

  public get curStart() {
    return this.timeframeService.getStart();
  }
  public set curStart(value: string) {
    this.timeframeService.setStart(value);
  }

  public get curEnd() {
    return this.timeframeService.getEnd();
  }
  public set curEnd(value: string) {
    this.timeframeService.setEnd(value);
  }

  constructor(public navParams: NavParams,
    private timeframeService: TimeframeService,
    private viewCtrl: ModalController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.timeframeService.setAdvanced()
  }

  toBasic() {
    this.navComponent.pop()
  }

}
