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

  confirma() {
    this.veiculoService.excluirVeiculo(environment.idSelecionado, environment.usuarioLogado).subscribe(() => {
        this.veiculoService.showMessageSuccess('Veículo Excluído com Sucesso!!!');
        this.reloadComponent();
      },
      error => {
        this.errors = error
        this.veiculoService.showMessageError(error.message.replace("Error: ", ""));
      });
    this.cancela();
  }

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
