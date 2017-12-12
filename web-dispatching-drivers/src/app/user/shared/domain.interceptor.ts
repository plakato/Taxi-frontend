import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Sets the domain to which every request is sent.
@Injectable()
export class DomainInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({url: 'api.taxiali.local/v2/' + req.url});
    return next.handle(newReq);
  }
}

// Sets header indication the request is JSON.
@Injectable()
export class JSONHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({headers: req.headers.set('content-type', 'application/json')});
       return next.handle(req);
  }
}

// Sets authentication token as a header if user is signed in.
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   // req = req.clone({headers: req.headers.set('Authentication', 'token')});
       return next.handle(req);
  }
}
