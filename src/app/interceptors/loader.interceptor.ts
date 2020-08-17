import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest}
  from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {LoaderService} from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    private count = 0;

    constructor(public loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

      this.count++;
      setTimeout(() => {
        if (this.count > 0) {
          this.loaderService.show();
        }
      }, 1000);
      return next.handle(request).pipe(
          finalize(() => {
            this.count--;
            if (this.count === 0) {
              this.loaderService.hide();
            }
          }),
      );
    }
}
