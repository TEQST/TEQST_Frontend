import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavParams, IonNav, ModalController} from '@ionic/angular';

import {FolderStats} from 'src/app/interfaces/folder-stats';
import {StatisticsService} from 'src/app/services/statistics.service';
import {SpeakerDetailPage} from '../speaker-detail/speaker-detail.page';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.page.html',
  styleUrls: ['./speaker-list.page.scss'],
})
export class SpeakerListPage {

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
    const role = navParams.get('role');

    this.statsServices.getSharedFolderStats(this.folderId, role)
        .subscribe((folderStats) => {
          this.addCompletedCountToSpeakers(folderStats);
          this.folderStats = folderStats;
          this.contentElem.nativeElement.classList.add('loaded');
        });
  }

  addCompletedCountToSpeakers(folderStats): void {
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

  showDetail(speaker): void {
    this.navComponent.push(SpeakerDetailPage, {
      folderName: this.folderStats.name,
      folderId: this.folderStats.id,
      speaker,
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

}
