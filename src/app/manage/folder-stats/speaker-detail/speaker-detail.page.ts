import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { TimeFormatService } from 'src/app/services/time-format.service';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.page.html',
  styleUrls: ['./speaker-detail.page.scss'],
})
export class SpeakerDetailPage implements OnInit {
  folderName: string
  folderId: string
  speaker: any

  constructor(public navParams: NavParams, public timeFormat: TimeFormatService) {
    this.folderName = navParams.get('folderName')
    this.folderId = navParams.get('folderId')
    this.speaker = navParams.get('speaker')
  }

  ngOnInit() {
  }

  

}
