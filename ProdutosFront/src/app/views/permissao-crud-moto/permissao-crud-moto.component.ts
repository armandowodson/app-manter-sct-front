import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-permissao-crud-moto',
  templateUrl: './permissao-crud-moto.component.html',
  styleUrls: ['./permissao-crud-moto.component.css']
})
export class PermissaoCrudMotoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    environment.moduloSelecionado = 2;
  }

}
