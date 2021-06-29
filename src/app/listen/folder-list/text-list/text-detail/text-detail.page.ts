import {RouteStateService} from 'src/app/services/route-state.service';
import {Observable} from 'rxjs';
import {TextObject} from 'src/app/interfaces/text-object';
import {SpeakerSelectPopoverComponent}
  from './speaker-select-popover/speaker-select-popover.component';
import {RecordingStateModel} from 'src/app/models/recording-state.model';
import {TextStats} from 'src/app/interfaces/text-stats';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {LoaderService} from 'src/app/services/loader.service';
import {PopoverController} from '@ionic/angular';
import {TextStateService} from 'src/app/services/text-state.service';
import { ListenerService } from 'src/app/services/listener.service';

@Component({
  selector: 'app-text-detail',
  templateUrl: './text-detail.page.html',
  styleUrls: ['./text-detail.page.scss'],
  providers: [TextStateService],
})

export class TextDetailPage implements OnInit {

  @ViewChild('content', {read: ElementRef}) contentElem: ElementRef

  public text: TextObject;
  public recordingState: RecordingStateModel;
  private textStats: TextStats;
  public selectedSpeaker: Observable<string>;
  private speakers: string[];
  public isLoading = false;

  constructor(private listenerService: ListenerService,
              private route: ActivatedRoute,
              private router: Router,
              private alertManager: AlertManagerService,
              private loaderService: LoaderService,
              private popoverController: PopoverController,
              private textStateService: TextStateService,
              private routeStateService: RouteStateService ) {

    this.loaderService.getIsLoading()
        .subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnInit() {
    const idString = this.route.snapshot.paramMap.get('textId');
    const id = isNaN(Number(idString)) ? null : parseInt(idString);
    let title = null;
    const routeParams = this.router.getCurrentNavigation().extras.state;
    if (typeof routeParams !== 'undefined' && 'title' in routeParams) {
      title = routeParams.title;
    }
    this.text = {
      id,
      title,
      language: null,
      is_right_to_left: null,
      shared_folder: null,
      content: null,
    };

    this.selectedSpeaker = this.routeStateService.speakerParam;
    this.getStats();
  }

  async presentSpeakerSelect(ev: any) {
    const popover = await this.popoverController.create({
      component: SpeakerSelectPopoverComponent,
      componentProps: {
        speakers: this.speakers,
        selectedSpeaker: this.selectedSpeaker,
      },
      event: ev,
      translucent: true,
      showBackdrop: false,
    });
    return await popover.present();
  }

  async getStats() {
    this.listenerService.getTextStats(this.text.id).subscribe((stats) => {
      this.textStats = stats;
      this.speakers = this.textStats.speakers.map((speaker) => {
        return speaker.name;
      },
      );
      this.selectedSpeaker.subscribe((speaker) => {
        this.switchSpeaker(speaker);
      });
    });
  }

  switchSpeaker(speakerName: string) {
    const speakerStats =
      this.textStats.speakers.find((speaker) => speaker.name === speakerName);
    if (!speakerStats) {
      // exit function if no matching speaker is found
      return;
    }
    this.recordingState = new RecordingStateModel(
        speakerStats.textrecording_id,
        speakerStats.finished);
    this.textStateService.setRecordingState(this.recordingState);
  }

  // TODO: check if ionViewWillEnter is the right lifecycle hook
  async ionViewWillEnter() {
    this.listenerService.getTextInfo(this.text.id.toString())
        .subscribe(
            (textObject) => {
              this.text = textObject;
              this.textStateService.setText(this.text);
              this.contentElem.nativeElement.classList.add('loaded');
            },
            (err) => this.alertManager.showErrorAlert(
                err.status, err.statusText),
        );
  }
}
