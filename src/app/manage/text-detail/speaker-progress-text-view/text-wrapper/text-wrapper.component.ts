import { RouteStateService } from './../../../services/route-state.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TextStateService } from 'src/app/services/text-state.service';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-text-wrapper',
  templateUrl: './text-wrapper.component.html',
  styleUrls: ['./text-wrapper.component.scss'],
})
export class TextWrapperComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>();
  public sentences: string[] = [];

  public furthestSentence: number = 1;
  public activeSentence: number = 1;

  constructor(private textStateService: TextStateService,
              private route: ActivatedRoute,
              private routeStateService: RouteStateService) { }

  ngOnInit() {
    this.subscribeToServices();
    this.shareRouteParams();
  }

  private subscribeToServices(): void {
    this.textStateService.getFurthestSentenceIndex().subscribe(index => this.furthestSentence = index);
    this.textStateService.getActiveSentenceIndex().subscribe(index => this.activeSentence = index);
    this.textStateService.getSentences().subscribe((sentences) => this.sentences = sentences);
  }

  private shareRouteParams(): void {
    this.route.paramMap
        .pipe(
          map(paramMap => paramMap.get('speaker')),
          takeUntil(this.destroy)
        )
        .subscribe((speakerParam) => this.routeStateService.updateSpeakerParamState(speakerParam));
  }

  // when clicking on a sentence set it to active
  onSelect(index: number): void {
    // this.playbackService.stopAudioPlayback();
    this.textStateService.setActiveSentenceIndex(index);
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
    this.routeStateService.updateSpeakerParamState(null);
  }

}
