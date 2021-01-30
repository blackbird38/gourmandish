import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let userAuthToken = this.authService.getToken();
    if (userAuthToken) {
      userAuthToken = userAuthToken.replace(/^"(.+(?="$))"$/, '$1');
    }
    const userAuthRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userAuthToken}`),
    });
    console.log(userAuthToken);
    return next.handle(userAuthRequest);
  }
}
