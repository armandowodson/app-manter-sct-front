import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {Registro} from "./registro.model";
import {LoginService} from "../../../service/login.service";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html"
})
export class RegistroComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  NODE_TLS_REJECT_UNAUTHORIZED = 0;
  public loading = false;
  public senhaConfirmacao = "";

  registro: Registro = {
    usuario: "",
    senha: "",
    nome: ""
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

  registrarLogin() {
      if (this.registro.nome.length < 10) {
        this.loginService.showMessageAlert('O Nome Comple deve conter ao menos 10 caracteres!');
        return;
      }
      if (this.registro.senha.length < 8) {
          this.loginService.showMessageAlert('A senha do usuário deve conter 8 caracteres!');
          return;
      }
      if (this.registro.usuario.length < 8) {
        this.loginService.showMessageAlert('O nome do Usuário deve ter ao menos 8 caracteres !');
        return;
      }
      if (this.registro.senha != this.senhaConfirmacao) {
        this.loginService.showMessageAlert('Senhas não conferem!');
        return;
      }

      this.loginService.registrarLogin(this.registro).subscribe(() => {
        this.loginService.showMessageSuccess('Usuário registrado com Sucesso!');
        this.router.navigate(['/logar']);
      },
      error => {
        this.errors = error
        this.loginService.showMessageError(this.errors);
      });
  }
}
