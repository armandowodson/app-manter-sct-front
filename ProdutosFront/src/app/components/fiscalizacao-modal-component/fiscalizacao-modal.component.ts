import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FiscalizacaoService } from '../../service/fiscalizacao.service';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-modal',
  templateUrl: './fiscalizacao-modal.component.html',
  styleUrls: ['./fiscalizacao-modal.component.css']
})

export class FiscalizacaoModalComponent implements OnInit {

  errors: string;
  fiscalizacaoSelecionada: string;

  constructor(public dialogRef: MatDialogRef<FiscalizacaoModalComponent>,
              private fiscalizacaoService: FiscalizacaoService,
              private router: Router) {
      this.errors = '';
      this.fiscalizacaoSelecionada = '';
  }

  ngOnInit() {
      this.fiscalizacaoSelecionada = this.dialogRef.id;
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  confirma() {
      var posicaoInicio = 0;
      var posicaoFim = 0;
      var idFiscalizacao = '';

      posicaoInicio = this.dialogRef.id.indexOf(':');
      posicaoFim = this.dialogRef.id.indexOf('-');
      idFiscalizacao = this.dialogRef.id.substr(posicaoInicio+1, (posicaoFim-1) - (posicaoInicio+1)).trim();

      this.fiscalizacaoService.excluirFiscalizacao(parseInt(idFiscalizacao), environment.usuarioLogado).subscribe(() => {
      this.fiscalizacaoService.showMessageSuccess('Fiscalização Excluída com Sucesso!!!');
      this.reloadComponent();
    },
    error => {
        this.errors = error
        this.fiscalizacaoService.showMessageError(this.errors);
    });
    this.cancela();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  cancela() {
    this.dialogRef.close();
  }

  reloadComponent() {
      let currentUrl = '/fiscalizacao';
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
