import {Component, Input, ViewChild} from '@angular/core';
import {ModalController, IonNav} from '@ionic/angular';

import {FolderStats} from 'src/app/interfaces/folder-stats';
import {SpeakerListPage} from './speaker-list/speaker-list.page';

@Component({
  selector: 'app-folder-stats',
  templateUrl: './folder-stats.page.html',
  styleUrls: ['./folder-stats.page.scss'],
})
export class FolderStatsPage {

  @Input() folderId: number;
  @Input() folderName: string;
  @Input() role: 'pub' | 'lstn';
  @ViewChild('navComponent', {static: false}) navComponent: IonNav

  public folderStats: FolderStats;

  constructor(private viewCtrl: ModalController) { }

  ionViewWillEnter(): void {
    console.log(this.navComponent);
    this.navComponent.push(SpeakerListPage, {
      navComponent: this.navComponent,
      viewCtrl: this.viewCtrl,
      folderId: this.folderId,
      folderName: this.folderName,
      role: this.role,
    });
  }


}
