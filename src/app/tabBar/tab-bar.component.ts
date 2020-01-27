import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-tabBar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}

  navigateToSettings(){
    this.navCtrl.navigateForward("settings");
  }

  navigateToPublish(){
    this.navCtrl.navigateForward("manage");
    
  }

  navigateToSpeak(){
    this.navCtrl.navigateForward("speak");
  }

}
