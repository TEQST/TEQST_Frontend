import {Component, Input, ViewChild} from '@angular/core';
import {ModalController, IonNav} from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import {SelectListenerPage} from './select-listener/select-listener.page';

@Component({
  selector: 'app-add-listener',
  templateUrl: './add-listener.page.html',
  styleUrls: ['./add-listener.page.scss'],
})
export class AddListenerPage {

  @Input() folderId: number;
  @Input() folderName: string;
  @ViewChild('navComponent') navComponent: IonNav;


  constructor(private viewCtrl: ModalController) { }

  ionViewWillEnter(): void {
    console.log(this.navComponent);
    this.navComponent.push(SelectListenerPage, {
      navComponent: this.navComponent,
      viewCtrl: this.viewCtrl,
      folderId: this.folderId,
      folderName: this.folderName,
    });
  }

  // showSelectSpeaker(listeners: User[]): void {
  //   this.navComponent.push(SelectListenerPage, {
  //     listeners: listeners,
  //   });
  // }

}
