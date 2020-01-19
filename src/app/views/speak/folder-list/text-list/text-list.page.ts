import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})
export class TextListPage implements OnInit {

  publisherName = null
  folderId = null
  texts: { id: string, name: string; }[];

  constructor(private route: ActivatedRoute) {
    this.texts = [
      {
        id: "t554",
        name: "text1"
      },
      {
        id: "t843",
        name: "text2"
      },
      {
        id: "t399",
        name: "text3"
      }
    ]
  }

  ngOnInit() {
    this.publisherName = this.route.snapshot.paramMap.get('publisherName');
    this.folderId = this.route.snapshot.paramMap.get('folderId');
  }

}
