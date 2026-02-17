import { Component, Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LoadingService} from "./service/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  isLoading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.loading$;
  }
}
