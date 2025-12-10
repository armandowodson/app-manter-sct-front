import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PontoTaxiService } from '../../service/ponto-taxi.service';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-modal',
  templateUrl: './ponto-taxi-modal.component.html',
  styleUrls: ['./ponto-taxi-modal.component.css']
})

export class PontoTaxiModalComponent implements OnInit {

  errors: string;
  pontoTaxiSelecionado: string;

  constructor(public dialogRef: MatDialogRef<PontoTaxiModalComponent>,
              private pontoTaxiService: PontoTaxiService,
              private router: Router) {
      this.errors = '';
      this.pontoTaxiSelecionado = '';
  }

  ngOnInit() {
      this.pontoTaxiSelecionado = this.dialogRef.id;
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

      this.pontoTaxiService.excluirPontoTaxi(parseInt(idPontoTaxi), environment.usuarioLogado).subscribe(() => {
      this.pontoTaxiService.showMessageSuccess('Ponto de Táxi Excluído com Sucesso!!!');
      this.reloadComponent();
    },
    error => {
        this.errors = error
        this.pontoTaxiService.showMessageError(this.errors);
    });
    this.cancela();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  cancela() {
    this.dialogRef.close();
  }

  reloadComponent() {
      let currentUrl = '/ponto-taxi';
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
