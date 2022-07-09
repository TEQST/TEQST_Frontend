import { Component, OnInit } from '@angular/core';
import { IonNav, NavParams, ModalController, AlertController } from '@ionic/angular';
import { AlertManagerService } from 'src/app/services/alert-manager.service';
import { ShareFolderService } from 'src/app/services/share-folder.service';
import { ListenerDataService } from '../listener-data.service';
import { SelectListenerPage } from '../select-listener/select-listener.page';


@Component({
  selector: 'app-manage-listenings',
  templateUrl: './manage-listenings.page.html',
  styleUrls: ['./manage-listenings.page.scss'],
})
export class ManageListeningsPage implements OnInit {

  public navComponent: IonNav;
  public listenings = [];

  constructor(
    public navParams: NavParams,
    public listenerData: ListenerDataService,
    private shareFolderService: ShareFolderService,
    private viewCtrl: ModalController,
    private alertController: AlertController,
    private alertManagerService: AlertManagerService,
  ) {
    this.navComponent = navParams.get('navComponent');

    // this.listenings = [
    //   {
    //     listeners: [
    //       {id: '12348', name: 'Tom'},
    //       {id: '24123', name: 'Sarah'},
    //       {id: '51942', name: 'Bob'},
    //     ],
    //     speakers: [
    //       {id: '59592', name: 'Joachim'},
    //       {id: '12335', name: 'Anna'},
    //       {id: '05912', name: 'Lisa'},
    //     ],
    //     accents: ['badisch', 'schwäbisch', 'bayrisch'],
    //   },
    // ];
  }

  

  ngOnInit() {
    this.fetchListenings();
  }

  ionViewWillEnter(): void {
    this.fetchListenings();
  }

  async fetchListenings() {
    const folderId = this.listenerData.getFolderId();
    await this.shareFolderService.getListenings(folderId)
        .toPromise()
        .then((listenings) => {
          this.listenings = listenings;
        });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addListening() {
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
    this.navComponent.push(SelectListenerPage, {
      navComponent: this.navComponent,
    });
  }

  deleteListening(listeningId): void {
    this.shareFolderService.deleteListening(listeningId)
        .subscribe((res) => {
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

  getStringOfUsernames(users) {
    return users.map((user) => user.username).join(', ');
  }
}