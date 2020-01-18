import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextServiceService } from './text-service.service';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.page.html',
  styleUrls: ['./record-view.page.scss'],
})
export class RecordViewPage implements OnInit {
  textId: string;
  hasRecording: boolean;

  constructor(private route: ActivatedRoute, private textService: TextServiceService) {
    textService.getHasRecording().subscribe((status) => this.hasRecording = status)
   }

  ngOnInit() {
    this.textId = this.route.snapshot.paramMap.get('publisherName');
    
    // TODO: get text name from service and set as title
  }

}
