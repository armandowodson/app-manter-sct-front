import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  confirma() {
    this.permissionarioService.excluirPermissionario(environment.idSelecionado, environment.usuarioLogado).subscribe(() => {
        this.permissionarioService.showMessageSuccess('Permissionário Excluído com Sucesso!!!');
        this.reloadComponent();
      },
      error => {
        this.errors = error
        this.permissionarioService.showMessageError(error.message.replace("Error: ", ""));
      });
    this.cancela();
  }

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
