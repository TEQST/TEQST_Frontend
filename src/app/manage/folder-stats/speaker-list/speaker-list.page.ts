import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavParams, IonNav, ModalController} from '@ionic/angular';
import {FolderStats} from 'src/app/interfaces/folder-stats';
import {StatisticsService} from 'src/app/services/statistics.service';
import {SpeakerDetailPage} from '../speaker-detail/speaker-detail.page';


@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.page.html',
  styleUrls: ['./speaker-list.page.scss'],
})
export class SpeakerListPage implements OnInit {

  @ViewChild('content', {read: ElementRef}) contentElem: ElementRef

  public navComponent: IonNav
  public folderId: number;
  public folderName: string;
  public folderStats: FolderStats

  constructor(public navParams: NavParams,
              private viewCtrl: ModalController,
              private statsServices: StatisticsService) {
    this.navComponent = navParams.get('navComponent');
    this.folderId = navParams.get('folderId');
    this.folderName = navParams.get('folderName');

    this.statsServices.getSharedFolderStats(this.folderId)
        .subscribe((folderStats) => {
          this.addCompletedCountToSpeakers(folderStats);
          this.folderStats = folderStats;
          this.contentElem.nativeElement.classList.add('loaded');
        });
  }

  ngOnInit() {}

  addCompletedCountToSpeakers(folderStats) {
    for (const speaker of folderStats.speakers) {
      let completedTextsCount = 0;
      for (const text of speaker.texts) {
        if (text.total == text.finished) {
          completedTextsCount++;
        }
      }
      speaker.completedTextsCount = completedTextsCount;
    }
  }

  showDetail(speaker) {
    this.navComponent.push(SpeakerDetailPage, {
      folderName: this.folderStats.name,
      folderId: this.folderStats.id,
      speaker,
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
