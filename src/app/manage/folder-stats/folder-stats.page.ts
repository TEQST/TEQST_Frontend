import { FolderStats } from './../../interfaces/folder-stats';
import { StatisticsService } from './../../services/statistics.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-folder-stats',
  templateUrl: './folder-stats.page.html',
  styleUrls: ['./folder-stats.page.scss'],
})
export class FolderStatsPage implements OnInit {

  @Input() folderId: number;
  @Input() folderName: string;

  public folderStats: FolderStats = {
    id: 0,
    name: 'Loading',
    speakers: []
  };

  constructor(private statsServices: StatisticsService, private viewCtrl: ModalController) { }

  ngOnInit() {
    this.statsServices.getSharedFolderStats(this.folderId).subscribe((folderStats) => {
      this.folderStats = folderStats;
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

}
