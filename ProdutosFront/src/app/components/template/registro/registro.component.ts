import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import {Registro} from "./registro.model";
import {LoginService} from "../../../service/login.service";
import {Md5} from "ts-md5";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html"
})
export class RegistroComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public loading = false;
  public senhaConfirmacao = "";

  registro: Registro = {
    usuario: "",
    senha: "",
    nome: "",
    modulos: ""
  };

  errors: string;
  isCheckedTaxi: boolean;
  isCheckedMotoTaxi: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.errors = "";
    this.isCheckedTaxi = false;
    this.isCheckedMotoTaxi = false;
  }

  ngOnInit(): void {

  }

  verificaTaxi(checked: boolean){
      this.isCheckedTaxi = checked;
  }

  verificaMotoTaxi(checked: boolean){
    this.isCheckedMotoTaxi = checked;
  }

  registrarLogin() {
      if(this.validarCamposObrigatoriosRegistro() == false){
        return;
      }

      if (this.registro.senha != this.senhaConfirmacao) {
        this.loginService.showMessageAlert('Senhas não conferem!');
        return;
      }

      const hash = Md5.hashStr(this.registro.senha);
      this.registro.senha = hash;

      if (this.registro.nome.length < 10) {
        this.loginService.showMessageAlert('O Nome Completo deve conter ao menos 10 caracteres!');
        return;
      }
      if (this.registro.senha.length < 8) {
          this.loginService.showMessageAlert('A senha do usuário deve conter 8 caracteres!');
          return;
      }
      if (this.registro.usuario.length < 11) {
        this.loginService.showMessageAlert('O Usuário/CPF deve ter 11 caracteres !');
        return;
      }

      if(this.isCheckedTaxi){
        this.registro.modulos = "1#"
      }

      if(this.isCheckedMotoTaxi){
        this.registro.modulos = this.registro.modulos + "2#"
      }

      this.loginService.registrarLogin(this.registro).subscribe({
        next: (response) => {
          this.loginService.showMessageSuccess('Usuário registrado com Sucesso!');
          this.router.navigate(['/logar']);
        },
        error: (error) => {
          this.loginService.showMessageError(error.message.replace("Error: ", ""));
        }
      });
  }

  validarCamposObrigatoriosRegistro(): boolean{
      if(this.registro.nome == null || this.registro.nome == ""){
        this.loginService.showMessageAlert('O campo Nome é obrigatório!');
        return false;
      }

      if(this.registro.usuario == null || this.registro.usuario == ""){
        this.loginService.showMessageAlert('O campo Usuário é obrigatório!');
        return false;
      }

      if(this.registro.senha == null || this.registro.senha == ""){
        this.loginService.showMessageAlert('O campo Senha é obrigatório!');
        return false;
      }

    if(this.isCheckedTaxi == false && this.isCheckedMotoTaxi == false){
      this.loginService.showMessageAlert('É necessário selecionar ao menos um dos Módulos!');
      return false;
    }

      return true;
  }
}
