import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { mergeMap, materialize, dematerialize } from "rxjs/operators";

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { body } = request;

    return of(new HttpResponse({ status: 200, body }))
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(dematerialize());

    function handleRoute() {
      return next.handle(request);
    }
  }
}

export const backendInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BackendInterceptor,
  multi: true,
};
