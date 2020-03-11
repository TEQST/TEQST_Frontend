import { Component, OnInit, ViewChild } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import { UsermgmtService } from '../services/usermgmt.service';
import { ElementRef } from '@angular/core';



@Component({
  selector: 'app-tabBar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit {

  @ViewChild('speakTab', { static: false}) speakTab;
  @ViewChild('manageTab', { static: false}) manageTab;
  @ViewChild('settingsTab', { static: false}) settingsTab;

  public isPublisher: boolean;

  constructor(public navCtrl: NavController, private router: Router, public usermgmtService: UsermgmtService) {


  }

  ngOnInit() {
    this.usermgmtService.getIsPublisher().subscribe((tempIsPublisher: boolean) => {
    this.isPublisher = tempIsPublisher;
    });
  }

  ngAfterViewInit() {
    let urlArr = this.router.url.split('/');
    if (urlArr.length > 0) {
      let tabName = urlArr[1] + 'Tab';
      this.setTabButtonActive(tabName);
    }
  }

  setTabButtonActive(tabName) {
    this.speakTab.el.classList.remove('active');
    if (typeof this.manageTab !== 'undefined') {
      this.manageTab.el.classList.remove('active');
    }
    this.settingsTab.el.classList.remove('active');
    let tabElem;
    switch (tabName) {
      case 'manageTab': tabElem = this.manageTab; break;
      case 'settingsTab': tabElem = this.settingsTab; break;
      default : tabElem = this.speakTab;
    }
    tabElem.el.classList.add('active');
  }

  // redirect to Settings Page
  navigateToSettings() {
    this.navCtrl.navigateForward('settings', { animated: false, });
  }
  // redirect to Publisher PAge
  navigateToManage() {
    this.navCtrl.navigateForward('manage', { animated: false, });
  }

  // redirect to Speak Page
  navigateToSpeak() {

    this.navCtrl.navigateForward('speak', { animated: false, });
  }

}
