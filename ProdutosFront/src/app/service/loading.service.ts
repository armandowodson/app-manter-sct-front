import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class LoadingService  {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Observable que os componentes podem observar
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}
