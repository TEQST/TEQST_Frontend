import {RouteStateService} from './../../services/route-state.service';
import {Observable} from 'rxjs';
import {TextObject} from './../../interfaces/text-object';
import {SpeakerSelectPopoverComponent} from './speaker-select-popover/speaker-select-popover.component';
import {RecordingStateModel} from './../../models/recording-state.model';
import {StatisticsService} from './../../services/statistics.service';
import {TextStats} from './../../interfaces/text-stats';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ManageFolderService} from 'src/app/services/manage-folder.service';
import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {LoaderService} from 'src/app/services/loader.service';
import {PopoverController} from '@ionic/angular';
import {TextStateService} from 'src/app/services/text-state.service';

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
  private textId: string;
  private textStats: TextStats;
  public selectedSpeaker: Observable<string>;
  private speakers: string[];
  public isLoading = false;

  constructor(private manageFolderService: ManageFolderService,
              private route: ActivatedRoute,
              private alertManager: AlertManagerService,
              private loaderService: LoaderService,
              private statsService: StatisticsService,
              private popoverController: PopoverController,
              private textStateService: TextStateService,
              private routeStateService: RouteStateService ) {
    this.loaderService.getIsLoading().subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnInit() {
    // retrieve text id and speaker from url
    this.textId = this.route.snapshot.paramMap.get('textId');
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
    this.statsService.getTextStats(Number.parseInt(this.textId, 10)).subscribe((stats) => {
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
    const speakerStats = this.textStats.speakers.find((speaker) => speaker.name === speakerName);
    if (!speakerStats) {
      // exit function if no matching speaker is found
      return;
    }
    this.recordingState = new RecordingStateModel(speakerStats.textrecording_id, speakerStats.finished);
    this.textStateService.setRecordingState(this.recordingState);
  }

  // TODO: check if ionViewWillEnter is the right lifecycle hook
  async ionViewWillEnter() {
    this.manageFolderService.getTextInfo(this.textId)
        .subscribe(
            (textObject) => {
              this.text = textObject;
              this.textStateService.setText(this.text);
              this.contentElem.nativeElement.classList.add('loaded');
            },
            (err) => this.alertManager.showErrorAlert(err.status, err.statusText),
        );
  }
}
