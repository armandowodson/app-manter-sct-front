import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {RegistroService} from "../../../service/registro.service";
import {Registro} from "./registro.model";

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

  registro: Registro = {
    usuario: "",
    senha: ""
  };

  errors: string;
  logou = 1;

  constructor(
    private registroService: RegistroService,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    public matDialog: MatDialog
  ) {
    this.errors = "";
  }

  ngOnInit(): void {

  }

  registrarLogin() {
    this.router.navigate(['products']);
  }

}
