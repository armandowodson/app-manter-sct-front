import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PontoTaxiService } from '../../service/ponto-taxi.service';
import {PermissionarioService} from "../../service/permissionario.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-modal',
  templateUrl: './permissionario-modal.component.html',
  styleUrls: ['./permissionario-modal.component.css']
})

export class PermissionarioModalComponent implements OnInit {

  errors: string;
  permissionarioSelecionado: string;

  constructor(public dialogRef: MatDialogRef<PermissionarioModalComponent>,
              private permissionarioService: PermissionarioService,
              private router: Router) {
      this.errors = '';
      this.permissionarioSelecionado = '';
  }

  ngOnInit() {
      this.permissionarioSelecionado = this.dialogRef.id;
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  confirma() {
      var posicaoInicio = 0;
      var posicaoFim = 0;
      var idPermissionario = '';

      posicaoInicio = this.dialogRef.id.indexOf(':');
      posicaoFim = this.dialogRef.id.indexOf('-');
    idPermissionario = this.dialogRef.id.substr(posicaoInicio+1, (posicaoFim-1) - (posicaoInicio+1)).trim();

      this.permissionarioService.excluirPermissionario(parseInt(idPermissionario), environment.usuarioLogado).subscribe(() => {
      this.permissionarioService.showMessageSuccess('Permissionário Excluído com Sucesso!!!');
      this.reloadComponent();
    },
    error => {
        this.errors = error
        this.permissionarioService.showMessageError(this.errors);
    });
    this.cancela();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  cancela() {
    this.dialogRef.close();
  }

  reloadComponent() {
      let currentUrl = '/permissionario';
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
