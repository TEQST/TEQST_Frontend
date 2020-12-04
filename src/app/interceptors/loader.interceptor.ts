import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse}
  from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

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
      }, 0);
      return next.handle(request).pipe(
          tap((evt) => {
            if (evt instanceof HttpResponse) {
              if(evt != null) {
                  this.count--;
                if (this.count === 0) {
                  this.loaderService.hide();
                }
              }
            }
            
          }),
      );
    }
}
