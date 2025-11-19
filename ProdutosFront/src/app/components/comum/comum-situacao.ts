import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCreateComponent } from '../product/product-create/product-create.component';
import { ProductReadComponent } from '../product/product-read/product-read.component';

interface Situacao {
  value: number;
  viewValue: string;
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-comum-situacao',
  templateUrl: './comum-situacao.html',
})

export class ComumSituacao implements OnInit {

  NODE_TLS_REJECT_UNAUTHORIZED=0;

  situacoes: Situacao[] = [
    {value: 0, viewValue: ''},
    {value: 1, viewValue: 'Ativo'},
    {value: 2, viewValue: 'Inativo'}
  ];

  situacaoSelecionada: number;

  constructor(private productReadComponent: ProductReadComponent,
              private productCreateComponent: ProductCreateComponent,
              private router: Router) 
  { 
    this.situacaoSelecionada = this.situacoes[0].value;
    this.productReadComponent.product.situacao = 0;
    this.productCreateComponent.product.situacao = 0;
  }

  ngOnInit(): void {  
    if (history.state.data) {
      this.situacaoSelecionada = history.state.data.situacao;
    }
  } 

  selecionarSituacao(event: Event) {
    this.situacaoSelecionada = parseInt((event.target as HTMLSelectElement).value);
    this.productReadComponent.product.situacao = this.situacaoSelecionada;
    this.productCreateComponent.product.situacao = this.situacaoSelecionada;
  }

  limparCombo(){
    this.situacaoSelecionada = this.situacoes[0].value;
    this.productReadComponent.product.situacao = 0;
    this.productCreateComponent.product.situacao = 0;
  }

}
