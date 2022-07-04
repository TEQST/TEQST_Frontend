import { Component, OnInit } from '@angular/core';
import { IonNav, NavParams, ModalController } from '@ionic/angular';
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

  openListening(i) {
    this.listenerData.setCreating(false);
    // TODO assign the data to the service
    console.log(i);
  }

  getStringOfUsernames(users) {
    return users.map((user) => user.username).join(', ');
  }
}