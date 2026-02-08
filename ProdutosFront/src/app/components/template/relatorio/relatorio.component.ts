import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-relatorio",
  templateUrl: "./relatorio.component.html"
})
export class RelatorioComponent implements OnInit {

  nomeLogado: string

  constructor(
    private router: Router
  ) {
    this.nomeLogado = '';
  }

  ngOnInit(): void {
      this.nomeLogado = environment.nomeLogado;
  }

  acessarRelatorioPermissao() {
    this.router.navigate(['permissao/relatorio']);
  }

}
