import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertManagerService {

  private alertActive: boolean;
  private alert: HTMLIonAlertElement;

  constructor(public alertController: AlertController, private navCtrl: NavController) { }

  async presentGoBackAlert(header: string, redirectURL: string = '/speak'): Promise<void>  {
    if (this.alertActive) {
      return;
    }
    this.alertActive = true;
    this.alert = await this.alertController.create({
      header,
      subHeader: 'Press OK to go back',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            // Navigate back to speak tab
            this.navCtrl.navigateBack(redirectURL);
        }
      }]
    });

    await this.alert.present();
  }

  async presentNotLoggedInAlert(): Promise<void>  {
    // not logged in alert is the most dominant alert so dismiss any other one
    if (this.alertActive) {
      this.alert.dismiss();
      this.alertActive = false;
    }
    this.alertActive = true;
    this.alert = await this.alertController.create({
      header: 'Unauthorized',
      subHeader: 'You are not logged in',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            // Navigate back to the login page
            this.navCtrl.navigateForward('/login');
            this.alertActive = false;
          }
        }]
    });
    await this.alert.present();
  }

  async showErrorAlert(status, msg, redirectURL: string = '/speak'): Promise<void>  {
    if (this.alertActive) {
      return;
    }
    this.alertActive = true;
    this.alert = await this.alertController.create({
      header: 'Error ' + status,
      message: msg,
      buttons: [{
        role: 'cancel',
        text: 'Go back',
        handler: () => {
          this.navCtrl.navigateBack(redirectURL);
          this.alertActive = false;
        }
      }]
    });

    await this.alert.present();
  }

  async showErrorAlertNoRedirection(header, msg, reload: boolean = false): Promise<void> {
    if (this.alertActive) {
      return;
    }
    this.alertActive = true;
    this.alert = await this.alertController.create({
      header,
      message: msg,
      buttons: [{
        role: 'cancel',
        text: 'OK',
        handler: () => {
          this.alertActive = false;
          if (reload === true) {
            window.location.reload();
          }
        }
      }]
    });

    await this.alert.present();
  }
}
