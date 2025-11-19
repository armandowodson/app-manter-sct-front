import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { Login } from "../login/login.model";
import { LoginService } from "../../../service/login.service";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

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
    this.router.navigate(['/']);
  }

}
