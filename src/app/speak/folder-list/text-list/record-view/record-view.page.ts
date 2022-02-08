import {Component, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, NavController} from '@ionic/angular';
import {takeUntil} from 'rxjs/operators';

import {RecordingPlaybackService}
  from './../../../../services/recording-playback.service';
import {RecordingUploadService}
  from './../../../../services/recording-upload.service';
import {AudioRecordingService} from './audio-recording.service';
import {TextServiceService} from './text-service.service';
import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {LoaderService} from 'src/app/services/loader.service';
import {SpeakTabNavService} from 'src/app/services/speak-tab-nav.service';
import {BaseComponent} from 'src/app/base-component';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.page.html',
  styleUrls: ['./record-view.page.scss'],
})

export class RecordViewPage extends BaseComponent implements OnInit {

  public textTitle: string;
  public hasRecording: boolean;
  private textId: number;
  public isUploadActive = false;
  public isRightToLeft: boolean;

  constructor(private route: ActivatedRoute,
              private textService: TextServiceService,
              private audioService: AudioRecordingService,
              private alertController: AlertController,
              private router: Router,
              public navCtrl: NavController,
              private alertService: AlertManagerService,
              public loaderService: LoaderService,
              private recordingUploadService: RecordingUploadService,
              private playbackService: RecordingPlaybackService,
              private speakTabNavService: SpeakTabNavService) {

    super(loaderService);

    this.textService.reset();

    this.textService.getSentenceHasRecording()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((status) => {
          this.hasRecording = status;
          // console.log(status)
        });
    this.textService.getTextTitle().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((title) => this.textTitle = title);
    this.textService.getIsRightToLeft().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((isRightToLeft) => this.isRightToLeft = isRightToLeft);
    this.recordingUploadService.getIsUploadActive()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((isUploadActive) => this.isUploadActive = isUploadActive);
  }

  ngOnInit(): void {
    // get text id based on the current url
    const textId = parseInt(this.route.snapshot.paramMap.get('textId'), 10);
    // check if its a number
    if (isNaN(textId)) {
      this.alertService.presentGoBackAlert('Invalid Text ID');
      return;
    }
    this.textId = textId;
    this.textService.setTextId(this.textId);
    /* if no text recording info exists present,
       an alert to give needed permissions */
    this.textService.checkIfRecordingInfoExists().then((result) => {
      if (!result) {
        this.presentPermissionsCheckbox();
      }
    }, () => this.alertService.presentGoBackAlert('No Access'));
  }

  public handleBackButton(): void {
    this.stopAllMedia();

    const url = this.router.url;
    const folderId = url.split('/')[3];
    this.speakTabNavService.loadContentsOfSharedFolder(folderId);
  }

  // listen for the browser back button press
  @HostListener('window:popstate', ['$event'])
  onPopState(): void {
    this.stopAllMedia();
  }

  public stopAllMedia(): void {
    this.playbackService.stopAudioPlayback();
    this.audioService.abortRecording();
  }

  // Present alert to the user to give permissions for the text
  // if its dismissed without any information entered go back
  async presentPermissionsCheckbox(): Promise<void> {
    const tts = true;
    const sr = true;
    this.textService.givePermissions(tts, sr);
  }
}
