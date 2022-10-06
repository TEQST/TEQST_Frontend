import {Component} from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.page.html',
  styleUrls: ['./documentation.page.scss'],
})
export class DocumentationPage {

  scrollToElement(e): void {
    e.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
