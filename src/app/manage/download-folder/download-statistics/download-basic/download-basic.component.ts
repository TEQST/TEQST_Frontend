import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonNav, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-download-basic',
  templateUrl: './download-basic.component.html',
  styleUrls: ['./download-basic.component.scss'],
})
export class DownloadBasicComponent implements OnInit {

  @ViewChild('datetime', {read: IonDatetime}) datePicker: IonDatetime;

  public navComponent: IonNav;

  constructor(public navParams: NavParams,
    private viewCtrl: ModalController) {
    this.navComponent = navParams.get('navComponent');
  }

  ngOnInit() {}

  //Despite the name, this only triggers when the confirm button is pressed
  onValueChange(ev: any) {
    console.log(ev.detail.value)
    console.log(ev.detail.value.split('-', 2))
    const splitted = ev.detail.value.split('-', 2)
    this.viewCtrl.dismiss({
      "month": splitted[1],
      "year": splitted[0],
    })
  }

}
