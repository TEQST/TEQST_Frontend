import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TextStateService} from 'src/app/services/text-state.service';

@Component({
  selector: 'app-basic-text-view',
  templateUrl: './basic-text-view.component.html',
  styleUrls: ['./basic-text-view.component.scss'],
})
export class BasicTextViewComponent implements OnInit, OnDestroy {

  public ngUnsubscribe = new Subject<void>();

  public sentences: string[] = [];
  public textTitle: string;

  constructor(private textStateService: TextStateService) {
    this.textStateService.getSentences().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((sentences) => this.sentences = sentences);
    textStateService.getTextTitle().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((title) => this.textTitle = title);
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
