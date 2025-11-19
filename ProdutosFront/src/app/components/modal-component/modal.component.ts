import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  errors: string;
  produtoSelecionado: string;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              private productService: ProductService,
              private router: Router) { 
      this.errors = '';
      this.produtoSelecionado = '';
  }

  ngOnInit() {
      this.produtoSelecionado = this.dialogRef.id;
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  confirma() {
    var posicaoInicio = 0;
    var posicaoFim = 0;
    var idProduto = '';

    posicaoInicio = this.dialogRef.id.indexOf(':');
    posicaoFim = this.dialogRef.id.indexOf('-');
    idProduto = this.dialogRef.id.substr(posicaoInicio+1, (posicaoFim-1) - (posicaoInicio+1)).trim();

    this.productService.excluirProduto(parseInt(idProduto)).subscribe(() => {
      this.productService.showMessageSuccess('Produto Excluído com Sucesso!!!');
      this.reloadComponent();
    },
    error => {
        this.errors = error
        this.productService.showMessageError(this.errors); 
    });
    this.cancela();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  cancela() {
    this.dialogRef.close();
  }

  reloadComponent() {
      let currentUrl = '/products';
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}