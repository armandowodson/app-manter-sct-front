import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-permissao-crud',
  templateUrl: './permissao-crud.component.html',
  styleUrls: ['./permissao-crud.component.css']
})
export class PermissaoCrudComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    environment.moduloSelecionado = 1;
  }

}
