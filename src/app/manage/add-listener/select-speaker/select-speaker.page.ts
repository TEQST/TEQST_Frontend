import {Component, OnInit, ViewChild} from '@angular/core';
import {IonNav, IonSlides, IonToggle, ModalController, NavParams} from '@ionic/angular';
import {ShareFolderService} from 'src/app/services/share-folder.service';
import {ListenerDataService} from '../listener-data.service';

@Component({
  selector: 'app-select-speaker',
  templateUrl: './select-speaker.page.html',
  styleUrls: ['./select-speaker.page.scss'],
})
export class SelectSpeakerPage implements OnInit {

  @ViewChild('slides', {static: true}) slider: IonSlides;
  @ViewChild('allToggle', {static: true}) allToggle: IonToggle;
  segment = 0;

  public navComponent: IonNav;
  public creating: boolean;

  constructor(public navParams: NavParams,
              public viewCtrl: ModalController,
              private listenerData: ListenerDataService,
              private shareFolderService: ShareFolderService) {

    this.navComponent = navParams.get('navComponent');
  }

  ngOnInit(): void {
    this.creating = this.listenerData.getCreating();
    this.allToggle.checked = this.listenerData.getAllSpeakers();
  }

  async segmentChanged($event): Promise<void> {
    await this.slider.slideTo($event.detail.value);
  }

  async slideChanged(): Promise<void> {
    this.segment = await this.slider.getActiveIndex();
  }

  async allUsersToggleChanged($event): Promise<void> {
    this.listenerData.setAllSpeakers($event.detail.value);
  }

  getValidatedListeningData()
  :{listenerIds: number[], speakerIds: number[], accents: string[], allSpeakers: boolean} {
    const listeners = this.listenerData.getListeners();
    if (listeners.length == 0) {
      alert('must have at least one listener');
      return;
    }
    const speakers = this.listenerData.getSpeakers();
    const accents = this.listenerData.getAccents();
    const allSpeakers = this.listenerData.getAllSpeakers();
    if (speakers.length == 0 && accents.length == 0 && !allSpeakers) {
      alert('speakers and accents cant both be empty unless you allow access to all');
      return;
    }
    const listenerIds = listeners.map((listener) => listener.id);
    const speakerIds = speakers.map((speaker) => speaker.id);
    return {
      listenerIds: listenerIds,
      speakerIds: speakerIds,
      accents: accents,
      allSpeakers: allSpeakers,
    };
  }

  createListening(): void {
    console.log('backend api call');
    const folderId = this.listenerData.getFolderId();
    const data = this.getValidatedListeningData();

    this.shareFolderService.createListening(
        folderId, data.listenerIds, data.speakerIds, data.accents, data.allSpeakers,
    ).subscribe((res) => {
      console.log('worked');
      this.navComponent.popToRoot();
    }, (err) => {
      console.log('error!!');
    });


    // this.navComponent.push(ManageListeningsPage, {
    //   navComponent: this.navComponent,
    // })
  }

  updateListening(): void {
    console.log('update listening');
    const listeningId = this.listenerData.getListeningId();
    const data = this.getValidatedListeningData();
    this.shareFolderService.updateListening(
        listeningId, data.listenerIds, data.speakerIds, data.accents, data.allSpeakers,
    ).subscribe((res) => {
      console.log('worked');
      this.navComponent.popToRoot();
    }, (err) => {
      alert('could not create listening');
    });
  }

}
