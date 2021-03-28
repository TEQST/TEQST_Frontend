import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.page.html',
  styleUrls: ['./documentation.page.scss'],
})
export class DocumentationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollToElement(e): void {
    e.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
