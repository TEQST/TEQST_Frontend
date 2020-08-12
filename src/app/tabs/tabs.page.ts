import { Component, OnInit } from '@angular/core';
import { UsermgmtService } from '../services/usermgmt.service';

import { ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { IonTabs, IonTabButton } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild(IonTabs, { static: false }) tabs: IonTabs;
  @ViewChildren(IonTabButton, {read: ElementRef}) tabbuttonsEl: any;
  @ViewChildren(IonTabButton) tabbuttons: any;
  
  public isPublisher: boolean;

  constructor(public usermgmtService: UsermgmtService) { }

  ngOnInit() {
    this.usermgmtService.getIsPublisher().subscribe((isPublisher: boolean) => {
      this.isPublisher = isPublisher
    });
  }

  onTouch(index) {
    this.tabs.select(this.tabbuttons.toArray()[index].tab);
  }

  ngAfterViewInit() {
    this.tabbuttonsEl.forEach((tabbuttonEl, index) => {
      tabbuttonEl.onTouch = this.onTouch.bind(this, index);
      tabbuttonEl.nativeElement.addEventListener(
        'touchend', tabbuttonEl.onTouch, { passive: true }
      );
    });
  }

  ngOnDestroy() {
    this.tabbuttonsEl.forEach((tabbuttonEl) => {
      tabbuttonEl.nativeElement.removeEventListener('touchend', tabbuttonEl.onTouch);
    });
  }
}
