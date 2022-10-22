import {ActivatedRoute} from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {takeUntil, map} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {RouteStateService} from 'src/app/services/route-state.service';
import {TextStateService} from 'src/app/services/text-state.service';

@Component({
  selector: 'app-text-wrapper',
  templateUrl: './text-wrapper.component.html',
  styleUrls: ['./text-wrapper.component.scss'],
})
export class TextWrapperComponent implements OnInit, OnDestroy {

  public sentences: string[] = [];
  public furthestSentence = 1;
  public activeSentence = 1;

  private ngUnsubscribe = new Subject<void>();

  constructor(private textStateService: TextStateService,
              private route: ActivatedRoute,
              private routeStateService: RouteStateService) { }

  ngOnInit(): void {
    this.subscribeToServices();
    this.shareRouteParams();
  }

  private subscribeToServices(): void {
    this.textStateService.getFurthestSentenceIndex()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((index) => this.furthestSentence = index);
    this.textStateService.getActiveSentenceIndex()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((index) => this.activeSentence = index);
    this.textStateService.getSentences().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((sentences) => this.sentences = sentences);
  }

  private shareRouteParams(): void {
    this.route.paramMap
        .pipe(
            map((paramMap) => paramMap.get('speaker')),
            takeUntil(this.ngUnsubscribe),
        )
        .subscribe((speakerParam) =>
          this.routeStateService.updateSpeakerParamState(speakerParam));
  }

  // when clicking on a sentence set it to active
  onSelect(index: number): void {
    // this.playbackService.stopAudioPlayback();
    this.textStateService.setActiveSentenceIndex(index);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.routeStateService.updateSpeakerParamState(null);
  }

}
