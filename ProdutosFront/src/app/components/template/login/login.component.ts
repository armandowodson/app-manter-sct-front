import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { Login } from "../login/login.model";
import { LoginService } from "../../../service/login.service";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  NODE_TLS_REJECT_UNAUTHORIZED = 0;
  public loading = false;

  login: Login = {
    usuario: "",
    senha: ""
  };

  errors: string;
  logou = 1;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    public matDialog: MatDialog
  ) {
    this.errors = "";
  }

  ngOnInit(): void {

  }

  logar() {
    this.loginService.efetuarLogin(this.login).subscribe(login => {
        if (login == null || login.usuario == '') {
          this.loginService.showMessageAlert('Usuário e/ou Senha inválidos!');
        }else{
          environment.loginGlobal = '1';
          environment.usuarioLogado = this.login.usuario;
          this.router.navigate(['/principal']);
        }
      },
      error => {
        this.errors = error
        this.loginService.showMessageError(this.errors);
    });
  }

}
