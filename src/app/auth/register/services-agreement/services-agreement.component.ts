import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-services-agreement',
  templateUrl: './services-agreement.component.html',
  styleUrls: ['./services-agreement.component.scss'],
})
export class ServicesAgreementComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
