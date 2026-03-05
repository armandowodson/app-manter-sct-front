import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-veiculo-crud',
  templateUrl: './veiculo-crud.component.html',
  styleUrls: ['./veiculo-crud.component.css']
})
export class VeiculoCrudComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    environment.moduloSelecionado = 1;
  }

}
