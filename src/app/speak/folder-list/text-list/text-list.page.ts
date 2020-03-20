import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';
import { AlertManagerService } from 'src/app/services/alert-manager.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})

export class TextListPage implements OnInit {

  public publisherId: string
  public folderId: string
  public texts: any
  folderName: any;
  public isLoading = false;

  constructor(private navService : SpeakTabNavService,
              private route: ActivatedRoute,
              private alertManager: AlertManagerService,
              private loaderService: LoaderService) {
    this.loaderService.getIsLoading().subscribe((isLoading) => this.isLoading = isLoading);
    this.publisherId = ''
    this.texts = []
  }

  ngOnInit() {
    this.publisherId = this.route.snapshot.paramMap.get('publisherId')
    this.folderId    = this.route.snapshot.paramMap.get('folderId')
  }
  
  async ionViewWillEnter() {
    this.navService.getInfoForSharedfolder(this.folderId)
      .subscribe(
        data => {
          this.folderName = data['name']
          this.texts = data['texts']
        },
        err => this.alertManager.showErrorAlert(err.status, err.statusText)
      )
  }

}
