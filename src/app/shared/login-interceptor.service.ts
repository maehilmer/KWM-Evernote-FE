import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";

import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()

export class LoginInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.error("Login error: Incorrect username or password");
        } else {
          console.error(`HTTP error: ${err.status} - ${err.message}`);
        }
      }
    }));
  }
}
