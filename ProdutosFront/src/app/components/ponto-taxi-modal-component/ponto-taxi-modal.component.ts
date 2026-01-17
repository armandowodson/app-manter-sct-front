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

  confirma() {
    this.pontoTaxiService.excluirPontoTaxi(environment.idSelecionado, environment.usuarioLogado).subscribe(() => {
        this.pontoTaxiService.showMessageSuccess('Ponto de Estacionamento de Táxi Excluído com Sucesso!!!');
        this.reloadComponent();
      },
      error => {
        this.errors = error
        this.pontoTaxiService.showMessageError(error.message.replace("Error: ", ""));
      });
    this.cancela();
  }

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
