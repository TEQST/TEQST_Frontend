import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TextStateService} from 'src/app/services/text-state.service';

@Component({
  selector: 'app-speaker-progress-text-view',
  templateUrl: './speaker-progress-text-view.component.html',
  styleUrls: ['./speaker-progress-text-view.component.scss'],
})
export class SpeakerProgressTextViewComponent implements OnInit, OnDestroy {

  public textTitle: string;
  private ngUnsubscribe = new Subject<void>();


  constructor(private textStateService: TextStateService) {
    textStateService.getTextTitle().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((title) => this.textTitle = title);
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
