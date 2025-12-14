import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html"
})
export class PrincipalComponent implements OnInit {

  nomeLogado: string

  constructor(
    private router: Router
  ) {
    this.nomeLogado = '';
  }

  ngOnInit(): void {
      this.nomeLogado = environment.nomeLogado;
  }

  acessarPontoTaxi() {
    this.router.navigate(['/ponto-taxi']);
  }

  acessarPermissionario() {
    this.router.navigate(['/permissionario']);
  }

  acessarVeiculoTaxi() {
    this.router.navigate(['/veiculo']);
  }

  acessarAuditoria() {
    this.router.navigate(['/auditoria']);
  }

}
