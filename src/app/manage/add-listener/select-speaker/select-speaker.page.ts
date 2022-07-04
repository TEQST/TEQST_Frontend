import {Component, OnInit, ViewChild} from '@angular/core';
import {IonNav, IonSlides, NavParams} from '@ionic/angular';
import { ShareFolderService } from 'src/app/services/share-folder.service';
import {ListenerDataService} from '../listener-data.service';
import {ManageListeningsPage} from '../manage-listenings/manage-listenings.page';

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

  constructor(
    public navParams: NavParams,
    private listenerData: ListenerDataService,
    private shareFolderService: ShareFolderService,
  ) {
    this.navComponent = navParams.get('navComponent');
  }

  ngOnInit() {
    this.creating = this.listenerData.getCreating();
  }

  async segmentChanged($event): Promise<void> {
    await this.slider.slideTo($event.detail.value);
  }

  async slideChanged(): Promise<void> {
    this.segment = await this.slider.getActiveIndex();
  }

  createListening() {
    console.log('backend api call');
    const folderId = this.listenerData.getFolderId();
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
    console.log(folderId);
    console.log(listenerIds);
    console.log(speakerIds);
    console.log(accents);

    this.shareFolderService.createListening(
        folderId, listenerIds, speakerIds, accents,
    ).subscribe((res) => {
      console.log('worked');
    }, (err) => {
      console.log('error!!');
    });

    this.navComponent.popToRoot();
    // this.navComponent.push(ManageListeningsPage, {
    //   navComponent: this.navComponent,
    // })
  }

  updateListening() {
    console.log('update listening');
  }

}
