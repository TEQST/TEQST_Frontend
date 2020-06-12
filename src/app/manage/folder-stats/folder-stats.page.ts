import { FolderStats } from './../../interfaces/folder-stats';
import { StatisticsService } from './../../services/statistics.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonNav } from '@ionic/angular';
import { SpeakerListPage } from './speaker-list/speaker-list.page'

@Component({
  selector: 'app-folder-stats',
  templateUrl: './folder-stats.page.html',
  styleUrls: ['./folder-stats.page.scss'],
})
export class FolderStatsPage implements OnInit {

  @Input() folderId: number;
  @Input() folderName: string;
  @ViewChild('navComponent', { static: false }) navComponent: IonNav

  public folderStats: FolderStats;

  constructor(private statsServices: StatisticsService, private viewCtrl: ModalController) { }

  ngOnInit() {
    this.statsServices.getSharedFolderStats(this.folderId).subscribe((folderStats) => {
      this.addCompletedCountToSpeakers(folderStats)
      this.folderStats = folderStats;
      this.navComponent.push(SpeakerListPage, {
        folderStats,
        navComponent: this.navComponent,
        viewCtrl: this.viewCtrl
      })
    });
  }

  addCompletedCountToSpeakers(folderStats) {
    for (let speaker of folderStats.speakers) {
      let completedTextsCount = 0;
      for (const text of speaker.texts) {
        if (text.total == text.finished) {
          completedTextsCount++;
        }
      }
      speaker.completedTextsCount = completedTextsCount
    }
  }

}