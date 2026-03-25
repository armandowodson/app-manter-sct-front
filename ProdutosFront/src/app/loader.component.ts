import { Component } from '@angular/core';
import { LoadingService } from './service/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `<div style="display: flex; justify-content: center; align-items: center; font-size: large; color: blue" *ngIf="loading$ | async" class="spinner"><b>Processando a Solicitação. Aguarde!</b></div>`
})
export class LoaderComponent {
  // O pipe async gerencia a inscrição e desinscrição automaticamente
  loading$ = this.loaderService.loading$;

  constructor(private loaderService: LoadingService) {
  }
}
