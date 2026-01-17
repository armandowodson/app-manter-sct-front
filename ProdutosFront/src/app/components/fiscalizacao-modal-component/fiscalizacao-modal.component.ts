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

  confirma() {
    this.fiscalizacaoService.excluirFiscalizacao(environment.idSelecionado, environment.usuarioLogado).subscribe(() => {
        this.fiscalizacaoService.showMessageSuccess('Fiscalização Excluída com Sucesso!!!');
        this.reloadComponent();
      },
      error => {
        this.errors = error
        this.fiscalizacaoService.showMessageError(error.message.replace("Error: ", ""));
      });
    this.cancela();
  }

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
