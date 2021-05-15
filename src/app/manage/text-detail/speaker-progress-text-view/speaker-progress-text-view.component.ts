import {Component, OnInit} from '@angular/core';
import {TextStateService} from 'src/app/services/text-state.service';

@Component({
  selector: 'app-speaker-progress-text-view',
  templateUrl: './speaker-progress-text-view.component.html',
  styleUrls: ['./speaker-progress-text-view.component.scss'],
})
export class SpeakerProgressTextViewComponent implements OnInit {

  public textTitle: string;

  constructor(private textStateService: TextStateService) {
    textStateService.getTextTitle().subscribe((title) => this.textTitle = title);
  }

  ngOnInit() {}

}
