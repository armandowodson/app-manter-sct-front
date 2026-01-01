import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {environment} from "../../../environments/environment";
import {PermissaoService} from "../../service/permissao.service";

@Component({
  selector: 'app-modal',
  templateUrl: './permissao-modal.component.html',
  styleUrls: ['./permissao-modal.component.css']
})

export class PermissaoModalComponent implements OnInit {

  errors: string;
  permissaoSelecionada: string;

  constructor(public dialogRef: MatDialogRef<PermissaoModalComponent>,
              private permissaoService: PermissaoService,
              private router: Router) {
      this.errors = '';
      this.permissaoSelecionada = '';
  }

  ngOnInit() {
      this.permissaoSelecionada = this.dialogRef.id;
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  confirma() {
      var posicaoInicio = 0;
      var posicaoFim = 0;
      var idPontoTaxi = '';

      posicaoInicio = this.dialogRef.id.indexOf(':');
      posicaoFim = this.dialogRef.id.indexOf('-');
      idPontoTaxi = this.dialogRef.id.substr(posicaoInicio+1, (posicaoFim-1) - (posicaoInicio+1)).trim();

      this.permissaoService.excluirPermissao(parseInt(idPontoTaxi), environment.usuarioLogado).subscribe(() => {
      this.permissaoService.showMessageSuccess('Permissão Excluída com Sucesso!!!');
      this.reloadComponent();
    },
    error => {
        this.errors = error
        this.permissaoService.showMessageError(this.errors);
    });
    this.cancela();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  cancela() {
    this.dialogRef.close();
  }

  reloadComponent() {
      let currentUrl = '/permissao';
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
