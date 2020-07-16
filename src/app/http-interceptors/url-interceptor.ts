import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders, HttpResponseBase
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, mergeMap, catchError, last, takeLast } from 'rxjs/operators';
@Injectable()
export class UrlHttpInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token');

        const selfReq = req.clone({
            url: environment.url + req.url,
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }),
        });

        return next.handle(selfReq).pipe(
            mergeMap((event: any) => {
                if (event instanceof HttpResponseBase) {
                    return of(event);
                }
                // 若一切都正常，则后续操作
                return of(event);
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.router.navigateByUrl('/login');
                }
                return of(err);
            }),
        );
    }
}
