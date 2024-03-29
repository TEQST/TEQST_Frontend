import {Router} from '@angular/router';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild}
  from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-speaker-select-popover',
  templateUrl: './speaker-select-popover.component.html',
  styleUrls: ['./speaker-select-popover.component.scss'],
})
export class SpeakerSelectPopoverComponent implements OnInit, OnDestroy {
  @ViewChild('searchbar', {read: ElementRef}) searchBarElem: ElementRef

  public ngUnsubscribe = new Subject<void>();
  public speakers = [];
  public filteredSpeakers = [];
  public selectedSpeaker: string;

  private speakerSelected: boolean;

  constructor(private navParams: NavParams,
              private router: Router,
              private popoverController: PopoverController) { }

  ngOnInit(): void {
    this.speakers = this.navParams.data.speakers;
    this.filteredSpeakers = this.speakers;
    this.navParams.data.selectedSpeaker.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((speaker) => {
          this.selectedSpeaker = speaker;
          this.speakerSelected = speaker ? true : false;
        });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ionViewDidEnter(): void {
    this.searchBarElem.nativeElement.setFocus();
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

  handleSearch(event): void {
    const searchTerm = event.target.value;
    this.filteredSpeakers = this.speakers.filter(
        (name) => name.startsWith(searchTerm));
  }

}
