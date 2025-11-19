import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { LoginService } from "../../../service/login.service";
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
    private loginService: LoginService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }

  entrar() {
    this.router.navigate(['logar']);
  }

  registrar() {
    this.router.navigate(['registrar']);
  }

}
