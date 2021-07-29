import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {LoaderService} from './services/loader.service';

@Injectable()
export class BaseComponent implements OnDestroy {
  public ngUnsubscribe = new Subject<void>();
  public isLoading = false;

  constructor(public loaderService: LoaderService) {
    this.loaderService.getIsLoading().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((isLoading) => {
          this.isLoading = isLoading;
        });
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
