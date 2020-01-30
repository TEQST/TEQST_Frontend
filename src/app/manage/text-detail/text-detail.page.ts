import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ManageFolderService } from 'src/app/services/manage-folder.service';
import { Text } from '../manage.text'


@Component({
  selector: 'app-text-detail',
  templateUrl: './text-detail.page.html',
  styleUrls: ['./text-detail.page.scss'],
})
export class TextDetailPage implements OnInit {
  loadingSpinner: any;
  text: Text

  constructor(private manageFolderService: ManageFolderService,
              private route: ActivatedRoute,
              public alertController: AlertController,
              public loadingController: LoadingController) {
    this.text = new Text('', '')
  }

  async ngOnInit() {
    let textId = this.route.snapshot.paramMap.get('textId');
    await this.presentLoadingSpinner()
    this.manageFolderService.getTextInfo(textId)
    .pipe(
      finalize(async () => { await this.loadingSpinner.dismiss(); })
    )
    .subscribe(
      data => {
        this.text = new Text(data['id'], data['title'], data['content'])
      },
      err => this.showErrorAlert(err.status, err.statusText)
    );
  }

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
