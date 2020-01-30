import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertManagerService {

  constructor(public alertController: AlertController, private navCtrl: NavController) { }

  async presentGoBackAlert(header: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: 'Press OK to go back',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            //Navigate back to speak tab
            this.navCtrl.navigateBack("/speak");
        }
      }]
    });

    await alert.present();
  }
}
