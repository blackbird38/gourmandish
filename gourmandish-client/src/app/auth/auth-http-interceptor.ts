import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userAuthToken = this.authService.getToken();
    const userAuthRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userAuthToken}`),
    });
    console.log(userAuthToken);
    return next.handle(userAuthRequest);
  }
}
