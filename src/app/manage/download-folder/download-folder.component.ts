import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-folder',
  templateUrl: './download-folder.component.html',
  styleUrls: ['./download-folder.component.scss'],
})
export class DownloadFolderComponent implements OnInit {

  @Input() folderId: number;
  @Input() isSharedfolder: boolean;
  @Input() role: 'pub' | 'lstn';

  constructor() { }

  ngOnInit() {}

}
