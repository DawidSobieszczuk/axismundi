import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get('No-Auth') === 'True') {
      return next.handle(request);
    }

    if (localStorage.getItem('userToken') != null) {
      request = request.clone({
      headers: request.headers.set(
        'Authorization',
        'Bearer ' + localStorage.getItem('userToken')
      )});
    }

    return next.handle(request);
  }
}
