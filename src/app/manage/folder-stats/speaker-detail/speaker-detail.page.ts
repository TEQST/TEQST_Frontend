import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.page.html',
  styleUrls: ['./speaker-detail.page.scss'],
})
export class SpeakerDetailPage implements OnInit {
  folderName: string
  folderId: string
  speaker: any

  constructor(public navParams: NavParams) {
    this.folderName = navParams.get('folderName')
    this.folderId = navParams.get('folderId')
    this.speaker = navParams.get('speaker')
    this.prettyFormatRecordTimes()
  }

  ngOnInit() {
  }

  prettyFormatRecordTimes() {
    this.speaker.rec_time_without_rep
      = this.getPrettyFormatedRecordTime(this.speaker.rec_time_without_rep)
    this.speaker.rec_time_with_rep
      = this.getPrettyFormatedRecordTime(this.speaker.rec_time_with_rep)
    for (let text of this.speaker.texts) {
      if ('rec_time_without_rep' in text && 'rec_time_with_rep' in text) {
        text.rec_time_without_rep
          = this.getPrettyFormatedRecordTime(text.rec_time_without_rep)
        text.rec_time_with_rep
          = this.getPrettyFormatedRecordTime(text.rec_time_with_rep)
      } else {
        text.rec_time_without_rep = 0
        text.rec_time_with_rep = 0
      }
    }
  }

  getPrettyFormatedRecordTime(time) {
    return Math.round(time)
  }

}
