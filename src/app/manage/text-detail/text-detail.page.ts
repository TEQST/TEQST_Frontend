import {PopoverController} from '@ionic/angular';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {TextObject} from 'src/app/interfaces/text-object';
import {SpeakerSelectPopoverComponent}
  from './speaker-select-popover/speaker-select-popover.component';
import {RecordingStateModel} from 'src/app/models/recording-state.model';
import {StatisticsService} from 'src/app/services/statistics.service';
import {TextStats} from 'src/app/interfaces/text-stats';
import {RouteStateService} from 'src/app/services/route-state.service';
import {ManageFolderService} from 'src/app/services/manage-folder.service';
import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {LoaderService} from 'src/app/services/loader.service';
import {TextStateService} from 'src/app/services/text-state.service';
import {BaseComponent} from 'src/app/base-component';

@Component({
  selector: 'app-text-detail',
  templateUrl: './text-detail.page.html',
  styleUrls: ['./text-detail.page.scss'],
  providers: [TextStateService],
})

export class TextDetailPage extends BaseComponent implements OnInit {

  @ViewChild('content', {read: ElementRef}) contentElem: ElementRef

  public text: TextObject;
  public recordingState: RecordingStateModel;
  public selectedSpeaker: Observable<string>;

  private textStats: TextStats;
  private speakers: string[] = [];

  constructor(public loaderService: LoaderService,
              private manageFolderService: ManageFolderService,
              private route: ActivatedRoute,
              private router: Router,
              private alertManager: AlertManagerService,
              private statsService: StatisticsService,
              private popoverController: PopoverController,
              private textStateService: TextStateService,
              private routeStateService: RouteStateService ) {
    super(loaderService);
  }

  ngOnInit(): void {
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

  hasNoSpeakers(): boolean {
    return this.speakers.length == 0;
  }

  async presentSpeakerSelect(ev: any): Promise<void> {
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

  async getStats(): Promise<void> {
    this.statsService.getTextStats(this.text.id).subscribe((stats) => {
      this.textStats = stats;
      this.speakers = this.textStats.speakers.map((speaker) => {
        return speaker.name;
      },
      );
      this.selectedSpeaker
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((speaker) => {
            this.switchSpeaker(speaker);
          });
    });
  }

  switchSpeaker(speakerName: string): void {
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
  async ionViewWillEnter(): Promise<void> {
    this.manageFolderService.getTextInfo(this.text.id.toString())
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
