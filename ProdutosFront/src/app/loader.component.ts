import {Injectable} from '@angular/core';
import {finalize, Observable} from "rxjs";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {LoadingService} from "./service/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.show(); // Mostra o loader
    return next.handle(request).pipe(
      finalize(() => this.loadingService.hide()) // Esconde o loader quando a request termina
    );
  }
}
