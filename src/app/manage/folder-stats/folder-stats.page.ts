import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-folder-stats',
  templateUrl: './folder-stats.page.html',
  styleUrls: ['./folder-stats.page.scss'],
})
export class FolderStatsPage implements OnInit {

  @Input() folderId: number;
  @Input() folderName: string;

  constructor() { }

  ngOnInit() {
  }

}
