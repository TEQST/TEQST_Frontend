import { Component, OnInit } from '@angular/core';
import { UsermgmtService } from '../services/usermgmt.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  public isPublisher: boolean;

  constructor(public usermgmtService: UsermgmtService) { }

  ngOnInit() {
    this.usermgmtService.getIsPublisher().subscribe((isPublisher: boolean) => {
      this.isPublisher = isPublisher
    });
    //this.updateURL()
  }

  updateURL() {
      //history.replaceState({page: 1}, document.title, window.location.href.replace('/tabs', ''));
  }

}
