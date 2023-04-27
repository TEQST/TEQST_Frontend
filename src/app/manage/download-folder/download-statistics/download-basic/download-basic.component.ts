import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonNav, ModalController, NavParams } from '@ionic/angular';
import { TimeframeService } from '../timeframe.service';
import { DownloadAdvancedComponent } from '../download-advanced/download-advanced.component';
import { LanguageService } from 'src/app/services/language.service';

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
    private languageService: LanguageService,
    private viewCtrl: ModalController) {
    this.navComponent = navParams.get('navComponent');
  }

  public get lang() {
    return this.languageService.getMenuLanguage()
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.timeframeService.setBasic();
  }

  toAdvanced() {
    this.navComponent.push(DownloadAdvancedComponent, {
      navComponent: this.navComponent,
    });
  }

}
