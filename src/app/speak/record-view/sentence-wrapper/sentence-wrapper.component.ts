import { Component, OnInit } from '@angular/core';
import { Sentence } from '../sentence';
import {TextServiceService} from '../text-service.service'

@Component({
  selector: 'app-sentence-wrapper',
  templateUrl: './sentence-wrapper.component.html',
  styleUrls: ['./sentence-wrapper.component.scss'],
})
export class SentenceWrapperComponent implements OnInit {

  sentences: Sentence[];

  getSentences(): void {
    this.textService.getSentences().subscribe(sentences => this.sentences = sentences)
  }
  constructor(private textService: TextServiceService) { }

  ngOnInit() {
    this.getSentences();
  }

}
