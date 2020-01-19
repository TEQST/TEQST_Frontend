import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.page.html',
  styleUrls: ['./folder-list.page.scss'],
})
export class FolderListPage implements OnInit {

  publisherName = null
  folders: { id: string, name: string; }[];

  constructor(private route: ActivatedRoute) {
    this.folders = [
      {
        id: "f123",
        name: "folder1"
      },
      {
        id: "f456",
        name: "folder2"
      },
      {
        id: "f789",
        name: "folder3"
      }
    ]
  }

  ngOnInit() {
    this.publisherName = this.route.snapshot.paramMap.get('publisherName');
  }

}
