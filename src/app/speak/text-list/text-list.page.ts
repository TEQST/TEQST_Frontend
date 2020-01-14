import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})
export class TextListPage implements OnInit {

  publisherName = null
  texts: { id: string, name: string; }[];

  constructor(private route: ActivatedRoute) {
    this.texts = [
      {
        id: "123",
        name: "text1"
      },
      {
        id: "456",
        name: "text2"
      },
      {
        id: "789",
        name: "text3"
      }
    ]
  }

  ngOnInit() {
    this.publisherName = this.route.snapshot.paramMap.get('publisherName');
  }

}
