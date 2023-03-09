import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonNav, NavParams, ModalController, AlertController}
  from '@ionic/angular';

import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {ShareFolderService} from 'src/app/services/share-folder.service';
import {ListenerDataService} from '../listener-data.service';
import {SelectListenerPage} from '../select-listener/select-listener.page';

@Component({
  selector: 'app-manage-listenings',
  templateUrl: './manage-listenings.page.html',
  styleUrls: ['./manage-listenings.page.scss'],
})

export class ManageListeningsPage implements OnInit {
  @ViewChild('listeningList', {read: ElementRef}) listeningListElem: ElementRef

  public navComponent: IonNav;
  public listenings = [];

  constructor(public navParams: NavParams,
              public listenerData: ListenerDataService,
              public viewCtrl: ModalController,
              private shareFolderService: ShareFolderService,
              private alertController: AlertController,
              private alertManagerService: AlertManagerService) {

    this.navComponent = navParams.get('navComponent');
  }

  ngOnInit(): void {
    this.fetchListenings();
  }

  ionViewWillEnter(): void {
    this.fetchListenings();
  }

  async fetchListenings(): Promise<void> {
    const folderId = this.listenerData.getFolderId();
    await this.shareFolderService.getListenings(folderId)
        .toPromise()
        .then((listenings) => {
          this.listenings = listenings;
          this.listeningListElem.nativeElement.classList.add('loaded');
        });
  }

  addListening(): void {
    this.listenerData.setCreating(true);
    this.listenerData.wipeSelectableData();
    this.navComponent.push(SelectListenerPage, {
      navComponent: this.navComponent,
    });
  }

  openListening(listening): void {
    this.listenerData.setCreating(false);
    // assign the data to the service
    this.listenerData.setListeningId(listening.id);
    this.listenerData.setListeners(listening.listeners);
    this.listenerData.setSpeakers(listening.speakers);
    this.listenerData.setAccents(listening.accents);
    this.listenerData.setAllSpeakers(listening.all_speakers);
    this.navComponent.push(SelectListenerPage, {
      navComponent: this.navComponent,
    });
  }

  deleteListening(listeningId): void {
    this.shareFolderService.deleteListening(listeningId)
        .subscribe(() => {
          this.fetchListenings();
        }, (err) => {
          this.alertManagerService.showErrorAlertNoRedirection(
              err.status,
              err.statusText,
          );
        });
  }

  async openDeleteListeningAlert(event, listeningId): Promise<void> {
    event.stopPropagation();
    const alert = await this.alertController.create({
      header: 'Attention!',
      message: `Do you really want to revoke this listening access?`,
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: (): void => this.deleteListening(listeningId),
        },
      ],
    });
    await alert.present();
  }

  getStringOfUsernames(users): string {
    return users.map((user) => user.username).join(', ');
  }
}
