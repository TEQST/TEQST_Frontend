import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-speaker-select-popover',
  templateUrl: './speaker-select-popover.component.html',
  styleUrls: ['./speaker-select-popover.component.scss'],
})
export class SpeakerSelectPopoverComponent implements OnInit {

  public speakers = [''];
  public selectedSpeaker = '';

  constructor(private navParams: NavParams, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.speakers = this.navParams.data.speakers;
    this.selectedSpeaker = this.navParams.data.selectedSpeaker;
  }

  public changeSpeaker(speaker: string): void {
    // get the current router url
    const url = this.router.url;
    // remove the textId param
    const goBackUrl = url.slice(0, url.lastIndexOf('/'));
    this.router.navigate([goBackUrl, speaker]);
  }

}
