import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonNav} from '@ionic/angular';
import {ListenerDataService} from './listener-data.service';
import {ManageListeningsPage}
  from './manage-listenings/manage-listenings.page';

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
    this.navComponent.push(ManageListeningsPage, {
      navComponent: this.navComponent,
    });
  }
}
