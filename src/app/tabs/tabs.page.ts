import {Component, OnInit} from '@angular/core';
import {ViewChild, ViewChildren, ElementRef} from '@angular/core';
import {IonTabs, IonTabButton} from '@ionic/angular';

import {UsermgmtService} from '../services/usermgmt.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild(IonTabs, {static: false}) tabs: IonTabs;
  @ViewChildren(IonTabButton, {read: ElementRef}) tabbuttonsEl: any;
  @ViewChildren(IonTabButton) tabbuttons: any;

  public isPublisher: boolean;
  public isListener: boolean;

  constructor(public usermgmtService: UsermgmtService) { }

  ngOnInit(): void {
    this.usermgmtService.getIsPublisher().subscribe((isPublisher: boolean) => {
      this.isPublisher = isPublisher;
    });
    this.usermgmtService.getIsListener().subscribe((isListener: boolean) => {
      this.isListener = isListener;
    });
  }

  onTouch(index): void {
    this.tabs.select(this.tabbuttons.toArray()[index].tab);
  }

  ngAfterViewInit(): void {
    this.tabbuttonsEl.forEach((tabbuttonEl, index) => {
      tabbuttonEl.onTouch = this.onTouch.bind(this, index);
      tabbuttonEl.nativeElement.addEventListener(
          'touchend', tabbuttonEl.onTouch, {passive: true},
      );
    });
  }

  ngOnDestroy(): void {
    this.tabbuttonsEl.forEach((tabbuttonEl) => {
      tabbuttonEl.nativeElement
          .removeEventListener('touchend', tabbuttonEl.onTouch);
    });
  }
}
