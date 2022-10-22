import {Component, OnInit, ViewChild} from '@angular/core';
import {IonNav, IonSlides, ModalController, NavParams} from '@ionic/angular';
import {ShareFolderService} from 'src/app/services/share-folder.service';
import {ListenerDataService} from '../listener-data.service';

@Component({
  selector: 'app-select-speaker',
  templateUrl: './select-speaker.page.html',
  styleUrls: ['./select-speaker.page.scss'],
})
export class SelectSpeakerPage implements OnInit {

  @ViewChild('slides', {static: true}) slider: IonSlides;
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
  }

  async segmentChanged($event): Promise<void> {
    await this.slider.slideTo($event.detail.value);
  }

  async slideChanged(): Promise<void> {
    this.segment = await this.slider.getActiveIndex();
  }

  getValidatedListeningData()
  :{listenerIds: number[], speakerIds: number[], accents: string[]} {
    const listeners = this.listenerData.getListeners();
    if (listeners.length == 0) {
      alert('must have at least one listener');
      return;
    }
    const speakers = this.listenerData.getSpeakers();
    const accents = this.listenerData.getAccents();
    if (speakers.length == 0 && accents.length == 0) {
      alert('speakers and accents cant both be empty');
      return;
    }
    const listenerIds = listeners.map((listener) => listener.id);
    const speakerIds = speakers.map((speaker) => speaker.id);
    return {
      listenerIds: listenerIds,
      speakerIds: speakerIds,
      accents: accents,
    };
  }

  createListening(): void {
    console.log('backend api call');
    const folderId = this.listenerData.getFolderId();
    const data = this.getValidatedListeningData();

    this.shareFolderService.createListening(
        folderId, data.listenerIds, data.speakerIds, data.accents,
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
        listeningId, data.listenerIds, data.speakerIds, data.accents,
    ).subscribe((res) => {
      console.log('worked');
      this.navComponent.popToRoot();
    }, (err) => {
      alert('could not create listening');
    });
  }

}
