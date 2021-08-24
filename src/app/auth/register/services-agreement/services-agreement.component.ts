import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-services-agreement',
  templateUrl: './services-agreement.component.html',
  styleUrls: ['./services-agreement.component.scss'],
})
export class ServicesAgreementComponent {

  constructor(private modalCtrl: ModalController) { }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

}
