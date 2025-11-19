import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class ProductEditComponent implements OnInit {

  product: Product = {
    idproduto: 0,
    nome: '',
    descricao: '',
    preco: 0,
    situacao: 0
  }

  errors: string;
  id: string;
  valorFormatado: string | null;

  constructor(private productService: ProductService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
    this.errors = '';
    this.id = '';
    this.valorFormatado = '';
  }

  transformarMoeda(element: FocusEvent){
    var numeroOracle: string | null = '';
    var posicaoPonto = 0;
    var posicaoVirgula = 0;

    numeroOracle = this.valorFormatado;
    // @ts-ignore
    posicaoPonto = numeroOracle.indexOf('.');
    // @ts-ignore
    posicaoVirgula = numeroOracle.indexOf(',');
    if (posicaoPonto != -1 && posicaoVirgula != -1){
        // @ts-ignore
      numeroOracle = this.valorFormatado.replace('R$', '');
        numeroOracle = numeroOracle.replace('.','');
        numeroOracle = numeroOracle.replace(',','.');
    }else{
      if (posicaoVirgula != -1){
        // @ts-ignore
        numeroOracle = this.valorFormatado.replace('R$', '');
        numeroOracle = numeroOracle.replace(',','.');
      }
    }
    this.valorFormatado = this.currencyPipe.transform(numeroOracle, 'R$', 'symbol', '1.2-2');
    //element.target.value = this.valorFormatado;
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.product.idproduto = history.state.data.idproduto;
      this.product.nome = history.state.data.nome;
      this.product.descricao = history.state.data.descricao;
      this.product.preco = history.state.data.preco;
      this.valorFormatado = history.state.data.preco.toString();
      this.product.situacao = history.state.data.situacao;
    }
  }

  consultarProdutoPeloID(id: number){
    this.product.idproduto = id;
    this.productService.consultarProdutoPeloID(this.product).subscribe(product => {
        if (product == null){
            this.productService.showMessageAlert('A consulta não retornou resultado!');
        }
        this.product.idproduto = product.idproduto;
        this.product.nome = product.nome;
        this.product.preco = product.preco;
        this.valorFormatado = product.preco.toString();
        this.product.situacao = product.situacao;
    },
      error => {
        this.errors = error
        this.productService.showMessageError(this.errors);
    });
  }

  editarProduto(): void{
    var numeroOracle = '';
    if (this.valorFormatado != null && this.valorFormatado != ''){
        numeroOracle = this.valorFormatado.replace('R$', '');
        numeroOracle = numeroOracle.replace('.', '').trim();
        numeroOracle = numeroOracle.replace(',', '.');
        this.product.preco = parseFloat(numeroOracle);
    }else{
        this.product.preco = 0;
    }

    this.productService.editarProduto(this.product).subscribe(() => {
      this.productService.showMessageSuccess('Produto Atualizado com Sucesso!!!');
      this.router.navigate(['/products']);
    },
    error => {
        this.errors = error
        this.productService.showMessageError(this.errors);
    });
  }

  cancelar(): void{
    this.router.navigate(['/products']);
  }
}
