import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})

export class TextListPage implements OnInit {
  loadingSpinner: any;
  publisherId = null
  folderId: string;
  texts: any;

  constructor(private navService : SpeakTabNavService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId');
    this.folderId = this.route.snapshot.paramMap.get('folderId');
  }
  
  async ionViewWillEnter() {
    await this.presentLoadingSpinner()
    this.navService.getTextsByFolderId(this.folderId)
      .pipe(
        finalize(async () => { await this.loadingSpinner.dismiss(); })
      )
      .subscribe(
        data => {
          this.texts = data
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
