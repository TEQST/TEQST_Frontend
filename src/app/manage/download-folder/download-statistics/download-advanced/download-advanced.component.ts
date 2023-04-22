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

  constructor(public navParams: NavParams,
    private timeframeService: TimeframeService,
    private viewCtrl: ModalController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.timeframeService.setAdvanced()
  }

  toBasic() {
    this.navComponent.popToRoot()
  }

}
