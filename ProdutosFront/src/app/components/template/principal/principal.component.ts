import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html"
})
export class PrincipalComponent implements OnInit {

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }

  acessarPontoTaxi() {
    this.router.navigate(['/ponto-taxi']);
  }

  acessarVeiculo() {
    this.router.navigate(['/veiculo']);
  }

}
