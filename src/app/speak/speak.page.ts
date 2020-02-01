import { Component, OnInit } from '@angular/core';
import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';
import { finalize } from 'rxjs/operators';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.page.html',
  styleUrls: ['./speak.page.scss'],
})
export class SpeakPage implements OnInit {
  loadingSpinner: any;
  publishers: any;

  constructor(private navService : SpeakTabNavService,
              public alertController: AlertController,
              public loadingController: LoadingController) { }
  
  ngOnInit() { }

  async ionViewWillEnter() {
    await this.presentLoadingSpinner()
    this.navService.getPublisherList()
      .pipe(
        finalize(async () => { await this.loadingSpinner.dismiss(); })
      )
      .subscribe(
        data => {
          this.publishers = data
        },
        err => this.showErrorAlert(err.status, err.statusText)
      );
  }
  

  // ### other ###

  async presentLoadingSpinner() {
    this.loadingSpinner = await this.loadingController.create({
        message: 'Loading...'
    });
    await this.loadingSpinner.present();
  }

  async showErrorAlert(status, msg) {
    const alert = await this.alertController.create({
      header: 'Error '+status,
      message: msg,
      buttons: [{
        text: 'Reload',
        handler: () => window.location.reload()
      }]
    });

    await alert.present();
  }

}
