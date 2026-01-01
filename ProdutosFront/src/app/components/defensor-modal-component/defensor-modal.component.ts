import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {DefensorService} from "../../service/defensor.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-modal',
  templateUrl: './defensor-modal.component.html',
  styleUrls: ['./defensor-modal.component.css']
})

export class DefensorModalComponent implements OnInit {

  errors: string;
  defensorSelecionado: string;

  constructor(public dialogRef: MatDialogRef<DefensorModalComponent>,
              private defensorService: DefensorService,
              private router: Router) {
      this.errors = '';
      this.defensorSelecionado = '';
  }

  ngOnInit() {
      this.defensorSelecionado = this.dialogRef.id;
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  confirma() {
      var posicaoInicio = 0;
      var posicaoFim = 0;
      var idDefensor = '';

      posicaoInicio = this.dialogRef.id.indexOf(':');
      posicaoFim = this.dialogRef.id.indexOf('-');
      idDefensor = this.dialogRef.id.substr(posicaoInicio+1, (posicaoFim-1) - (posicaoInicio+1)).trim();

      this.defensorService.excluirDefensor(parseInt(idDefensor), environment.usuarioLogado).subscribe(() => {
      this.defensorService.showMessageSuccess('Defensor Excluído com Sucesso!!!');
      this.reloadComponent();
    },
    error => {
        this.errors = error
        this.defensorService.showMessageError(this.errors);
    });
    this.cancela();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  cancela() {
    this.dialogRef.close();
  }

  reloadComponent() {
      let currentUrl = '/defensor';
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
