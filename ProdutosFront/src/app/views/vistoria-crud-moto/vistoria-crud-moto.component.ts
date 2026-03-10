import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-vistoria-crud-moto',
  templateUrl: './vistoria-crud-moto.component.html',
  styleUrls: ['./vistoria-crud-moto.component.css']
})
export class VistoriaCrudMotoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    environment.moduloSelecionado = 2;
  }

}
