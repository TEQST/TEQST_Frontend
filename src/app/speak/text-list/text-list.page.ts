import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.page.html',
  styleUrls: ['./text-list.page.scss'],
})
export class TextListPage implements OnInit {

  publisherName = null

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.publisherName = this.route.snapshot.paramMap.get('publisherName');
  }

}
