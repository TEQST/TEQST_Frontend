import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {LoaderService} from '../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptorService implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(public loaderService: LoaderService) {}

  removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    if (this.requests.length === 0) {
      this.loaderService.hide();
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {

    this.requests.push(request);
    this.loaderService.show();

    return next.handle(request).pipe(
        tap({
          next: (event) => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
            }
          },
          error: (err) => {
            if (err instanceof HttpErrorResponse) {
              this.removeRequest(request);
            }
          },
          complete: () => {
            // is called every time when the observable is completed
            // this.removeRequest(request);
          },
        }),
    );
  }
}
