import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {VistoriaService} from "../../service/vistoria.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-modal-vistoria',
  templateUrl: './vistoria-modal.component.html',
  styleUrls: ['./vistoria-modal.component.css']
})

export class VistoriaModalComponent implements OnInit {

  errors: string;
  vistoriaSelecionada: string;

  constructor(public dialogRef: MatDialogRef<VistoriaModalComponent>,
              private vistoriaService: VistoriaService,
              private router: Router) {
      this.errors = '';
      this.vistoriaSelecionada = '';
  }

  ngOnInit() {
      this.vistoriaSelecionada = this.dialogRef.id;
  }

  confirma() {
    this.vistoriaService.excluirVistoria(environment.idSelecionado, environment.usuarioLogado).subscribe(() => {
        this.vistoriaService.showMessageSuccess('Laudo de Vistoria Excluído com Sucesso!!!');
        this.reloadComponent();
      },
      error => {
        this.errors = error
        this.vistoriaService.showMessageError(error.message.replace("Error: ", ""));
      });
    this.cancela();
  }

  cancela() {
    this.dialogRef.close();
  }

  reloadComponent() {
      let currentUrl = '/vistoriamoto';
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
