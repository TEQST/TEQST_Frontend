import { Component, OnInit } from '@angular/core';
import {TextServiceService} from '../text-service.service'

@Component({
  selector: 'app-sentence-wrapper',
  templateUrl: './sentence-wrapper.component.html',
  styleUrls: ['./sentence-wrapper.component.scss'],
})
export class SentenceWrapperComponent implements OnInit {

  sentences: String[];
  activeSentence: number;

  constructor(private textService: TextServiceService) { }

  ngOnInit() {
    this.getSentences();
    this.getActiveSentence();
  }

  getSentences(): void {
    this.textService.getSentences().subscribe(sentences => this.sentences = sentences);
  }

  getActiveSentence(): void {
    this.textService.getActiveSentenceIndex().subscribe(index => this.activeSentence = index);
  }

  onSelect(index: number): void {
    this.textService.setActiveSentenceIndex(index)
  }

}
