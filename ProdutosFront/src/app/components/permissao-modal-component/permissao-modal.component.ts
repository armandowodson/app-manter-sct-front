import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {environment} from "../../../environments/environment";
import {PermissaoService} from "../../service/permissao.service";

@Component({
  selector: 'app-modal-permissao',
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

  confirma() {
      this.permissaoService.excluirPermissao(environment.idSelecionado, environment.usuarioLogado).subscribe(() => {
        this.permissaoService.showMessageSuccess('Termo de Autorização Excluído com Sucesso!!!');
        this.reloadComponent();
      },
      error => {
        this.errors = error
        this.permissaoService.showMessageError(error.message.replace("Error: ", ""));
      });
      this.cancela();
  }

  cancela() {
    this.dialogRef.close();
  }

  reloadComponent() {
      let currentUrl = '';
      if(environment.moduloSelecionado == 1){
        currentUrl = '/permissao';
      }else{
        currentUrl = '/permissaomoto';
      }
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
