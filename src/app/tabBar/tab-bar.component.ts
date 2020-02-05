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

  //redirect to Settings Page
  navigateToSettings(){
    this.navCtrl.navigateForward("settings");
  }
  //redirect to Publisher PAge
  navigateToPublish(){
    this.navCtrl.navigateForward("manage");
    
  }

  //redirect to Speak Page
  navigateToSpeak(){
    this.navCtrl.navigateForward("speak");
  }

}
