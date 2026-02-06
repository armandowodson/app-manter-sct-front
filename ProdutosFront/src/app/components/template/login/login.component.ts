import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { Login } from "../login/login.model";
import { LoginService } from "../../../service/login.service";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {Md5} from "ts-md5";

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
    senha: "",
    nome: "",
    modulos: ""
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
    if(this.validarCamposObrigatoriosLogin() == false){
      return;
    }

    const hash = Md5.hashStr(this.login.senha);
    this.login.senha = hash;

    this.loginService.efetuarLogin(this.login).subscribe({
      next: (response) => {
        this.loginService.showMessageSuccess('Login Efetuado com Sucesso!');
        environment.loginGlobal = '1';
        environment.usuarioLogado = this.login.usuario;
        environment.nomeLogado = response.nome;
        environment.modulosUsuario = response.modulos;
        this.router.navigate(['/principal']);
      },
      error: (error) => {
        this.loginService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
  }

  validarCamposObrigatoriosLogin(): boolean{
    if(this.login.usuario == null || this.login.usuario == ""){
      this.loginService.showMessageAlert('O campo Usuário é obrigatório!');
      return false;
    }

    if(this.login.senha == null || this.login.senha == ""){
      this.loginService.showMessageAlert('O campo Senha é obrigatório!');
      return false;
    }

    return true;
  }

}
