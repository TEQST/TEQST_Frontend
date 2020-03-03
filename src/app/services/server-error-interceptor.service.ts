import { UsermgmtService } from 'src/app/services/usermgmt.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { AlertManagerService } from './alert-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorInterceptorService implements HttpInterceptor {

  constructor(private alertService: AlertManagerService, private userService: UsermgmtService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.alertService.presentNotLoggedInAlert();
          // If the client uses an invalid token delete the locally stored one
          // TODO: improve api error for easier checking
          if (error.error.detail === 'Invalid token.') {
            this.userService.deleteAuthToken();
          }
        } else {
          return throwError(error);
        }
      })
    );
  }
}
