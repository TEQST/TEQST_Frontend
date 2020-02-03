import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertManagerService {

  private alertActive: boolean;
  private alert: HTMLIonAlertElement;

  constructor(public alertController: AlertController, private navCtrl: NavController) { }

  async presentGoBackAlert(header: string) {
    if(this.alertActive) {
      return;
    }
    this.alert = await this.alertController.create({
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

    await this.alert.present();
  }

  async presentNotLoggedInAlert() {
    if (this.alertActive) {
      this.alert.dismiss;
    }
    this.alertActive = true;
    this.alert = await this.alertController.create({
      header: "Unauthorized",
      subHeader: 'You are not logged in',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            //Navigate back to the login page
            this.navCtrl.navigateBack("/login");
            this.alertActive = false;
          }
        }]
    });
    await this.alert.present();
  }
}
