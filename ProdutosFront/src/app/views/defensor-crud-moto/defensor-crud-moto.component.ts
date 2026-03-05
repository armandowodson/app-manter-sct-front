import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-defensor-crud-moto',
  templateUrl: './defensor-crud-moto.component.html',
  styleUrls: ['./defensor-crud-moto.component.css']
})
export class DefensorCrudMotoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    environment.moduloSelecionado = 2;
  }

}
