import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeakTabNavService } from 'src/app/services/speak-tab-nav.service';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.page.html',
  styleUrls: ['./folder-list.page.scss'],
})
export class FolderListPage implements OnInit {

  publisherName = null
  folders: { name: string; }[];

  constructor(private navService : SpeakTabNavService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.publisherName = this.route.snapshot.paramMap.get('publisherName');
    this.folders = this.navService.getFoldersByPublisherName(this.publisherName)
  }

}
