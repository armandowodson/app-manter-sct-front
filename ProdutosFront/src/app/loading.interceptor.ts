import {Injectable} from '@angular/core';
import {finalize, Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {LoadingService} from "./service/loading.service";

@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient, private loaderService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show(); // Mostra o loader
    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide()) // Esconde o loader quando a request termina
    );
  }
}
