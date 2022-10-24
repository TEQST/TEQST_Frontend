import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {TextStateService} from 'src/app/services/text-state.service';

@Component({
  selector: 'app-speaker-progress-text-view',
  templateUrl: './speaker-progress-text-view.component.html',
  styleUrls: ['./speaker-progress-text-view.component.scss'],
})
export class SpeakerProgressTextViewComponent implements OnDestroy {

  public ngUnsubscribe = new Subject<void>();
  public textTitle: string;

  constructor(private textStateService: TextStateService) {
    this.textStateService.getTextTitle().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((title) => this.textTitle = title);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
