import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})
export class TextListPage implements OnInit {

  publisherName = null
  folderName = null
  texts: { id: string, name: string; }[];

  constructor(private navService : SpeakTabNavService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.publisherName = this.route.snapshot.paramMap.get('publisherName');
    this.folderName = this.route.snapshot.paramMap.get('folderName');
    this.texts = this.navService.getTextsByFolderId(this.folderName)
  }

}
