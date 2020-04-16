import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.updateURL()
  }

  updateURL() {
      //history.replaceState({page: 1}, document.title, window.location.href.replace('/tabs', ''));
  }

}
