import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ServerAuthtokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('Token');
    let authReq;
    if (request.headers.get('Content-Type') !== null || request.urlWithParams ) {
      authReq = request.clone({
        setHeaders: { Authorization: authToken}
      });
    } else {
      authReq = request.clone({
        setHeaders: { Authorization: authToken,
           'Content-Type': 'application/json'}
      });
    }
    return next.handle(authReq);

  }
}
