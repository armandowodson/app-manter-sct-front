import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-defensor-crud',
  templateUrl: './defensor-crud.component.html',
  styleUrls: ['./defensor-crud.component.css']
})
export class DefensorCrudComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    environment.moduloSelecionado = 1;
  }

}
