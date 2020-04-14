import { RecordingStateModel } from './../../models/recording-state.model';
import { StatisticsService } from './../../services/statistics.service';
import { TextStats } from './../../interfaces/text-stats';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ManageFolderService } from 'src/app/services/manage-folder.service';
import { Text } from '../manage.text'
import { AlertManagerService } from 'src/app/services/alert-manager.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-text-detail',
  templateUrl: './text-detail.page.html',
  styleUrls: ['./text-detail.page.scss'],
})

export class TextDetailPage implements OnInit {

  public text: Text
  public textState: RecordingStateModel;
  private textId: string;
  private textStats: TextStats;
  private selectedSpeaker: string;
  public isLoading = false;

  constructor(private manageFolderService: ManageFolderService,
              private route: ActivatedRoute,
              private alertManager: AlertManagerService,
              private loaderService: LoaderService,
              private statsService: StatisticsService) {
    this.loaderService.getIsLoading().subscribe((isLoading) => this.isLoading = isLoading);
    this.text = new Text('', '')
  }

  ngOnInit() {
    // retrieve text id and speaker from url
    this.textId = this.route.snapshot.paramMap.get('textId');
    this.selectedSpeaker = this.route.snapshot.paramMap.get('speaker');
    if (this.selectedSpeaker !== null) {
      this.getStats();
    }
  }

  async getStats() {
    this.statsService.getTextStats(Number.parseInt(this.textId, 10)).subscribe((stats) => {
      this.textStats = stats;
      this.switchSpeaker(this.selectedSpeaker);
    });
  }

  switchSpeaker(speakerName: string) {
    const speakerStats = this.textStats.speakers.find((speaker) => speaker.name === speakerName);
    this.textState = new RecordingStateModel(speakerStats.finished, this.textStats.total);
  }

  async ionViewWillEnter() {
    this.manageFolderService.getTextInfo(this.textId)
    .subscribe(
      data => {
        this.text = new Text(data['id'], data['title'], data['content'])
      },
      err => this.alertManager.showErrorAlert(err.status, err.statusText)
    )
  }
}
