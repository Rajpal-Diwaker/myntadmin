import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { app_strings } from '../_constants/app_strings';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: UserService,
    private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(evt => {
          if (evt instanceof HttpResponse) {
            this.authService.hideLoder();
            if (evt.status === 201) {
              this.authService.success(evt.body.message);
            }
            if (evt.body.code === '402') {
              this.authService.error(evt.body.message);
            }
          }
        }),
        catchError((error: HttpErrorResponse) => {
          var errMsg = '';
          if (!error.error) {
            return
          }

          if (error.error instanceof ErrorEvent) {
            errMsg = `${error.error.message}`;
          }
          else {  // Server Side Error
            errMsg = error && error.error && error.error.message ? error.error.message : ""
            if (!error.error.message) {
              errMsg = "Server not responding"
            }
          }
          this.authService.hideLoder()
          this.authService.error(errMsg)
          // return an observable
          return throwError(errMsg);
        })
      )
  }
}
