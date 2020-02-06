import { Injectable } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertManagerService {

  private alertActive: boolean;
  private alert: HTMLIonAlertElement;
  private loadingSpinner: HTMLIonLoadingElement


  constructor(public alertController: AlertController,private loadingController: LoadingController, private navCtrl: NavController) { }

  async showLoadingSpinner() {
    this.loadingSpinner = await this.loadingController.create({
      message: 'Loading...'
    })
    await this.loadingSpinner.present()
  }

  async hideLoadingSpinner() {
    await this.loadingSpinner.dismiss()
  }

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
    //not logged in alert is the most dominant alert so dismiss any other one
    if (this.alertActive) {
      this.alert.dismiss;
    }
    this.hideLoadingSpinner();
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

  async showErrorAlert(status, msg) {
    if (this.alertActive) {
      return;
    }
    this.alert = await this.alertController.create({
      header: 'Error ' + status,
      message: msg,
      buttons: [{
        role: 'cancel',
        text: 'Go back',
        handler: () => {
          // navigate to speak since every user has access to this one
          this.navCtrl.navigateBack("/speak");
          this.alertActive = false;
        }
      }]
    });

    await this.alert.present()
  }

  async showErrorAlertNoRedirection(header, msg) {
    if (this.alertActive) {
      return;
    }
    this.alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [{
        role: 'cancel',
        text: 'OK',
        handler: () => {
          this.alertActive = false;
        }
      }]
    });

    await this.alert.present()
  }
}
