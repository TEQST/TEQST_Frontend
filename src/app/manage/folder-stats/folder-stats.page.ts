import {FolderStats} from './../../interfaces/folder-stats';
import {StatisticsService} from './../../services/statistics.service';
import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ModalController, IonNav} from '@ionic/angular';
import {SpeakerListPage} from './speaker-list/speaker-list.page';

@Component({
  selector: 'app-folder-stats',
  templateUrl: './folder-stats.page.html',
  styleUrls: ['./folder-stats.page.scss'],
})
export class FolderStatsPage implements OnInit {

  @Input() folderId: number;
  @Input() folderName: string;
  @ViewChild('navComponent', {static: false}) navComponent: IonNav

  public folderStats: FolderStats;

  constructor(private viewCtrl: ModalController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.navComponent.push(SpeakerListPage, {
      navComponent: this.navComponent,
      viewCtrl: this.viewCtrl,
      folderId: this.folderId,
      folderName: this.folderName,
    });
  }


}
