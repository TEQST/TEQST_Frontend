import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController, IonNav} from '@ionic/angular';
import {User} from 'src/app/interfaces/user';
import {ListenerDataService} from './listener-data.service';
import { ManageListeningsPage } from './manage-listenings/manage-listenings.page';
import {SelectListenerPage} from './select-listener/select-listener.page';
import {SelectSpeakerPage} from './select-speaker/select-speaker.page';

@Component({
  selector: 'app-add-listener',
  templateUrl: './add-listener.page.html',
  styleUrls: ['./add-listener.page.scss'],
})
export class AddListenerPage implements OnInit {

  @Input() folderId: number;
  @Input() folderName: string;
  @ViewChild('navComponent') navComponent: IonNav;

  public step = 0;

  constructor(private listenerData: ListenerDataService) { }

  ngOnInit(): void {
    this.listenerData.setFolderId(this.folderId);
  }

  ionViewWillEnter(): void {
    console.log(this.navComponent);
    this.navComponent.push(ManageListeningsPage, {
      navComponent: this.navComponent,
      // viewCtrl: this.viewCtrl,
    });
  }
}
