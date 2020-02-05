import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { TextServiceService } from './text-service.service';
import { AlertManagerService } from 'src/app/services/alert-manager.service';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.page.html',
  styleUrls: ['./record-view.page.scss'],
})
export class RecordViewPage implements OnInit {

  public textTitle: string;
  public hasRecording: boolean;
  private textId: number;

  constructor(private route: ActivatedRoute, 
              private textService: TextServiceService,
              private alertController: AlertController, 
              private navCtrl: NavController,
              private alertService: AlertManagerService) {
    textService.getSentenceHasRecording().subscribe((status) => this.hasRecording = status);
    textService.getTextTitle().subscribe((title) => this.textTitle = title);
   }

  ngOnInit() {
    //get text id based on the current url
    let textId = parseInt(this.route.snapshot.paramMap.get('textId')) ; 
    //check if its a number
    if(isNaN(textId)) {
      this.alertService.presentGoBackAlert("Invalid Text ID")
      return
    }
    this.textId = textId;
    this.textService.setTextId(this.textId);
    //if no recording info exists present an alert to give needed permissions
    this.textService.checkIfRecordingInfoExists().then(result => {
      result ? '' : this.presentPermissionsCheckbox()
    }, () => this.alertService.presentGoBackAlert("No Access"));
  }

  //Present Alert to the user to give permissions for the text
  //if its dismissed without any information entered go back
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
            this.navCtrl.navigateBack("speak");
          }
        }, {
          text: 'Ok',
          handler: (permissions) => {
            //check if atleast one option is selected
            if(Object.keys(permissions).length === 0) {
              this.navCtrl.navigateBack("speak");
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
