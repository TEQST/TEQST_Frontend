import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.page.html',
  styleUrls: ['./record-view.page.scss'],
})
export class RecordViewPage implements OnInit {
  textId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.textId = this.route.snapshot.paramMap.get('publisherName');
    
    // TODO: get text name from service and set as title
  }

}
