import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {VeiculoService} from "../../service/veiculo.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-modal',
  templateUrl: './veiculo-modal.component.html',
  styleUrls: ['./veiculo-modal.component.css']
})

export class VeiculoModalComponent implements OnInit {

  errors: string;
  veiculoSelecionado: string;

  constructor(public dialogRef: MatDialogRef<VeiculoModalComponent>,
              private veiculoService: VeiculoService,
              private router: Router) {
      this.errors = '';
      this.veiculoSelecionado = '';
  }

  ngOnInit() {
      this.veiculoSelecionado = this.dialogRef.id;
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  confirma() {
      var posicaoInicio = 0;
      var posicaoFim = 0;
      var idVeiculo = '';

      posicaoInicio = this.dialogRef.id.indexOf(':');
      posicaoFim = this.dialogRef.id.indexOf('-');
    idVeiculo = this.dialogRef.id.substr(posicaoInicio+1, (posicaoFim-1) - (posicaoInicio+1)).trim();

      this.veiculoService.excluirVeiculo(parseInt(idVeiculo), environment.usuarioLogado).subscribe(() => {
      this.veiculoService.showMessageSuccess('Veículo Excluído com Sucesso!!!');
      this.reloadComponent();
    },
    error => {
        this.errors = error
        this.veiculoService.showMessageError(this.errors);
    });
    this.cancela();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  cancela() {
    this.dialogRef.close();
  }

  reloadComponent() {
      let currentUrl = '/veiculo';
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
