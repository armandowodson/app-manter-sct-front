import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductReadComponent } from '../product/product-read/product-read.component';

interface Sinal {
  value: number;
  viewValue: string;
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-comum-sinal',
  templateUrl: './comum-sinal.html',
})

export class ComumSinal implements OnInit {

  NODE_TLS_REJECT_UNAUTHORIZED=0;

  sinais: Sinal[] = [
    {value: 0, viewValue: ""},
    {value: 1, viewValue: "="},
    {value: 2, viewValue: ">="},
    {value: 3, viewValue: "<="}
  ];

  sinalSelecionado: number;

  constructor(private productReadComponent: ProductReadComponent,
              private router: Router) 
  { 
    this.sinalSelecionado = this.sinais[0].value;
    this.productReadComponent.product.situacao = 0;
  }

  ngOnInit(): void {  
    this.sinalSelecionado = this.sinais[0].value;
  } 

  

  selecionarSinal(event: Event) {
    this.sinalSelecionado = parseInt((event.target as HTMLSelectElement).value);
    switch (this.sinalSelecionado) {
        case 0 : this.productReadComponent.sinal = ""; break;
        case 1 : this.productReadComponent.sinal = "="; break;
        case 2 : this.productReadComponent.sinal = ">="; break;
        case 3 : this.productReadComponent.sinal = "<="; break;
    }
  }

  limparCombo(){
    this.sinalSelecionado = this.sinais[0].value;
    this.productReadComponent.sinal = '';
  }

}
