import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { ManageFolderService } from 'src/app/services/manage-folder.service';
import { Text } from '../manage.text'
import { PopupNotifier } from 'src/app/popupNotifier/popup-notifier';

@Component({
  selector: 'app-text-detail',
  templateUrl: './text-detail.page.html',
  styleUrls: ['./text-detail.page.scss'],
})

export class TextDetailPage implements OnInit {

  private text: Text

  constructor(private manageFolderService: ManageFolderService,
              private route: ActivatedRoute,
              private popupNotifier: PopupNotifier) {
    this.text = new Text('', '')
  }

  async ngOnInit() {
    let textId = this.route.snapshot.paramMap.get('textId')
    await this.popupNotifier.showLoadingSpinner()
    this.manageFolderService.getTextInfo(textId)
    .pipe(
      finalize(async () => { await this.popupNotifier.hideLoadingSpinner() })
    )
    .subscribe(
      data => {
        this.text = new Text(data['id'], data['title'], data['content'])
      },
      err => this.popupNotifier.showErrorAlert(err.status, err.statusText)
    )
  }
}
