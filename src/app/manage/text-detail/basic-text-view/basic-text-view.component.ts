import { Component, OnInit } from '@angular/core';
import { TextStateService } from 'src/app/services/text-state.service';

@Component({
  selector: 'app-basic-text-view',
  templateUrl: './basic-text-view.component.html',
  styleUrls: ['./basic-text-view.component.scss'],
})
export class BasicTextViewComponent implements OnInit {

  public sentences: string[] = [];

  constructor(private textStateService: TextStateService) {
    this.textStateService.getSentences().subscribe((sentences) => this.sentences = sentences);
  }

  ngOnInit() {}

}
