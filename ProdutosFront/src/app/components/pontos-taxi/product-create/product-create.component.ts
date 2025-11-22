import { Component, Injectable, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
})

export class ProductCreateComponent implements OnInit {

  NODE_TLS_REJECT_UNAUTHORIZED=0

  product: Product = {
    idproduto: 0,
    nome: '',
    descricao: '',
    preco: 0,
    situacao: 0
  }

  errors: string;
  valorFormatado: string | null;

  constructor(private productService: ProductService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
    this.errors = '';
    this.product.situacao = 0;
    this.valorFormatado = '';
  }

  ngOnInit(): void {
    this.product.nome = '';
    this.product.preco = 0;
    this.product.situacao  = 0;
}

  transformarMoeda(element: FocusEvent){
    var numeroOracle = '';
    if (this.valorFormatado != null){
        numeroOracle = this.valorFormatado.replace('R$', '');
        numeroOracle = numeroOracle.replace('.','');
        numeroOracle = numeroOracle.replace(',','.');
    }
    this.valorFormatado = this.currencyPipe.transform(numeroOracle, 'R$', 'symbol', '1.2-2');
    console.log("transformarMoeda: " + this.valorFormatado);
    //element.target.value = this.valorFormatado;
  }

  inserirProduto(): void{
    var numeroOracle = '';
    if (this.valorFormatado != null && this.valorFormatado != ''){
        numeroOracle = this.valorFormatado.replace('R$', '');
        numeroOracle = numeroOracle.replace('.', '').trim();
        numeroOracle = numeroOracle.replace(',', '.');
        this.product.preco = parseFloat(numeroOracle);
    }else{
        this.product.preco = 0;
    }

    this.productService.inserirProduto(this.product).subscribe(() => {
      this.productService.showMessageSuccess('Produto Criado com Sucesso!!!');
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
