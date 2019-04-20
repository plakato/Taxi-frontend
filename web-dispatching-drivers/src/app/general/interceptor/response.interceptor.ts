import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../error/error.service';

// Shows HTTP response errors to user.
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor( private errorService: ErrorService ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap(
          data => {},
          error => this.errorService.notifyUser(error)
        )
      );
  }
}
