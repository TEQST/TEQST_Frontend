import {Injectable} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertManagerService {

  private alertActive: boolean;
  private alert: HTMLIonAlertElement;
  private noInternetAlert: HTMLIonAlertElement;

  constructor(
    public alertController: AlertController,
    private navCtrl: NavController) {

    this.alertController.create({animated: false}).then((t) => {
      t.present(); t.dismiss();
    });
  }

  async presentGoBackAlert(
      header: string,
      redirectURL = '/tabs/speak'): Promise<void> {

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
          handler: (): void => {
            // Navigate back to speak tab
            this.navCtrl.navigateBack(redirectURL);
          },
        }],
    });

    await this.alert.present();
  }

  async presentLoginFailedAlert(): Promise<void> {
    if (this.alertActive) {
      return;
    }
    this.alertActive = true;
    this.alert = await this.alertController.create({
      header: 'Login Failed',
      subHeader: 'Invalid credentials',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: (): void => {
            // Navigate back to the login page
            this.navCtrl.navigateForward('/login');
            this.alertActive = false;
          },
        }],
    });
    await this.alert.present();
  }

  async presentNotLoggedInAlert(): Promise<void> {
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
          handler: (): void => {
            // Navigate back to the login page
            this.navCtrl.navigateForward('/login');
            this.alertActive = false;
          },
        }],
    });
    await this.alert.present();
  }

  async showErrorAlert(
      status,
      msg,
      redirectURL = '/tabs/speak'): Promise<void> {

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
        handler: (): void => {
          this.navCtrl.navigateBack(redirectURL);
          this.alertActive = false;
        },
      }],
    });

    await this.alert.present();
  }

  async showErrorAlertNoRedirection(
      header,
      msg,
      reload = false): Promise<void> {

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
        handler: (): void => {
          this.alertActive = false;
          if (reload === true) {
            window.location.reload();
          }
        },
      }],
    });

    await this.alert.present();
  }

  async presentNoInternetAlert(): Promise<void> {
    this.noInternetAlert = await this.alertController.create({
      header: 'No Internet',
      message: 'Please restore the connection to the internet',
      backdropDismiss: false,
    });

    await this.noInternetAlert.present();
  }

  async presentRecordingInfoAlert(): Promise<void> {
    this.alert = await this.alertController.create({
      header: 'Recording instruction',
      message: `Please first press the record button and then start to talk. 
        If you are not sure if you have recorded correctly
        please select a recording and use the play function
        on the left to check your recording.`,
      backdropDismiss: false,
      buttons: [{
        role: 'cancel',
        text: 'OK',
        handler: (): void => {
          this.alertActive = false;
        },
      }],
    });

    await this.alert.present();
  }

  dismissNoInternetAlert(): void {
    if (this.noInternetAlert != null) {
      this.noInternetAlert.dismiss();
    }
  }
}
