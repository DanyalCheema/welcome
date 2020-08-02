import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';

import { LocalStorageService } from '../_services/local-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: LocalStorageService, public router: Router) { }

  // 1. Sending an Invalid Token will generate error
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      // for Spring Boot back-end
      authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(authReq).pipe(
      catchError((error) => {
        console.log('error is intercept');
        console.error(error);
        return throwError(error.message);
      })
    );
  }

  // 2.  No Errors
  intercept1(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error in intercept');
        console.error(error);
        return throwError(error.message);
      })
    );
  }

  intercept3(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = 'invald token';
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage = '';
        let handled = false;
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
            console.error('Error Event');
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

            console.log(`error status : ${error.status}\nMessage:${error.statusText}`);

            switch (error.status) {
              case 401:      // login
                this.router.navigateByUrl('/login');
                console.log(`redirect to login`);
                handled = true;
                break;
              case 403:     // forbidden
                this.router.navigateByUrl('/login');
                console.log(`redirect to login`);
                handled = true;
                break;
            }
          }
        }
        else {
          console.error('Other Errors');
        }

        if (handled) {
          console.log('return back ');
          return of(error);
        } else {
          window.alert(errorMessage);
          console.log('throw error back to to the subscriber');
          return throwError(error);
        }
      })
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
