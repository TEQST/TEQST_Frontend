import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-speaker-select-popover',
  templateUrl: './speaker-select-popover.component.html',
  styleUrls: ['./speaker-select-popover.component.scss'],
})
export class SpeakerSelectPopoverComponent implements OnInit {

  public speakers = [''];
  public selectedSpeaker: string;

  private speakerSelected: boolean;

  constructor(private navParams: NavParams,
              private router: Router,
              private popoverController: PopoverController) { }

  ngOnInit(): void {
    this.speakers = this.navParams.data.speakers;
    this.navParams.data.selectedSpeaker.subscribe((speaker) => {
      this.selectedSpeaker = speaker;
      this.speakerSelected = speaker ? true : false;
    });
  }

  public changeSpeaker(speaker: string): void {
    // get the current router url
    const url = this.router.url;
    const lastParamStartIndex = url.lastIndexOf('/');
    // if a speaker is selected remove the speaker from the url
    const urlNoSpeaker =
      this.speakerSelected ? url.slice(0, lastParamStartIndex) : url;
    this.router.navigate([urlNoSpeaker, speaker]);
    this.dismissPopover();
  }

  async dismissPopover(): Promise<void> {
    await this.popoverController.dismiss();
  }

}
