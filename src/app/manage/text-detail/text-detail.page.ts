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
  private textId: string;
  public isLoading = false;

  constructor(private manageFolderService: ManageFolderService,
              private route: ActivatedRoute,
              private alertManager: AlertManagerService,
              private loaderService: LoaderService) {
    this.loaderService.getIsLoading().subscribe((isLoading) => this.isLoading = isLoading);
    this.text = new Text('', '')
  }

  async ngOnInit() {
    // retrieve text id from url
    this.textId = this.route.snapshot.paramMap.get('textId')
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
