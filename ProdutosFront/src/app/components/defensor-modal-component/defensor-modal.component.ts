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

  confirma() {
    this.defensorService.excluirDefensor(environment.idSelecionado, environment.usuarioLogado).subscribe(() => {
        this.defensorService.showMessageSuccess('Defensor Excluído com Sucesso!!!');
        this.reloadComponent();
      },
      error => {
        this.errors = error
        this.defensorService.showMessageError(error.message.replace("Error: ", ""));
      });
    this.cancela();
  }

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
