import {FolderStats} from './../../interfaces/folder-stats';
import {Component, Input, ViewChild} from '@angular/core';
import {ModalController, IonNav} from '@ionic/angular';
import {SpeakerListPage} from './speaker-list/speaker-list.page';

@Component({
  selector: 'app-folder-stats',
  templateUrl: './folder-stats.page.html',
  styleUrls: ['./folder-stats.page.scss'],
})
export class FolderStatsPage {

  @Input() folderId: number;
  @Input() folderName: string;
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
    });
  }


}
