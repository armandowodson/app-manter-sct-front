import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-veiculo-crud-moto',
  templateUrl: './veiculo-crud-moto.component.html',
  styleUrls: ['./veiculo-crud-moto.component.css']
})
export class VeiculoCrudMotoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    environment.moduloSelecionado = 2;
  }

}
