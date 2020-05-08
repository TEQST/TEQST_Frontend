import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ServerAuthtokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('Token');
    const authReq = request.clone({
      setHeaders: { Authorization: authToken}
    });
    return next.handle(authReq);

  }
}
