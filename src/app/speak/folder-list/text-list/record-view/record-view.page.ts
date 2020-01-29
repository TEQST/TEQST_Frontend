import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { TextServiceService } from './text-service.service';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.page.html',
  styleUrls: ['./record-view.page.scss'],
})
export class RecordViewPage implements OnInit {
  textId: number;
  hasRecording: boolean;

  constructor(private route: ActivatedRoute, private textService: TextServiceService, private alertController: AlertController, private navCtrl: NavController) {
    textService.getSentenceHasRecording().subscribe((status) => this.hasRecording = status)
   }

  ngOnInit() {
    this.textId = parseInt(this.route.snapshot.paramMap.get('textId')) ; 
    console.log(this.textId);
    this.textService.setTextId(this.textId);
    this.textService.checkIfRecordingInfoExists().then(result => {
      result ? '' : this.presentPermissionsCheckbox()
    });
    // TODO: get text name from service and set as title
  }

  async presentPermissionsCheckbox() {
    const alert = await this.alertController.create({
      header: 'Recording Permissions',
      backdropDismiss: false,
      message: "You have to select atleast one",
      inputs: [
        {
          name: 'textToSpeech',
          type: 'checkbox',
          label: 'For Text to Speech',
          value: 'TTS',
        },

        {
          name: 'speechRecognition',
          type: 'checkbox',
          label: 'For Speech Recognition',
          value: 'SR'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.navCtrl.back();
          }
        }, {
          text: 'Ok',
          handler: (permissions) => {
            //check if atleast one option is selected
            if(Object.keys(permissions).length === 0) {
              this.navCtrl.back();
            } else {
              // Check which of the options is selected
              let tts = Object.values(permissions).indexOf('TTS') > -1;
              let sr = Object.values(permissions).indexOf('SR') > -1;
              this.textService.givePermissions(tts, sr);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
