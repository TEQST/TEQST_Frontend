import { Component, OnInit } from '@angular/core';
import { IonNav, NavParams } from '@ionic/angular';
import { ManageListeningsPage } from '../manage-listenings/manage-listenings.page';

@Component({
  selector: 'app-select-speaker',
  templateUrl: './select-speaker.page.html',
  styleUrls: ['./select-speaker.page.scss'],
})
export class SelectSpeakerPage implements OnInit {

  public navComponent: IonNav

  constructor(
    public navParams: NavParams,
  ) {
    this.navComponent = navParams.get('navComponent');
  }

  ngOnInit() {
  }

  createListening() {
    console.log('backend api call');
    this.navComponent.popToRoot();
    // this.navComponent.push(ManageListeningsPage, {
    //   navComponent: this.navComponent,
    // })
  }

}
