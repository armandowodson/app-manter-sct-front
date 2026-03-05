import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-permissionario-crud-moto',
  templateUrl: './permissionario-crud-moto.component.html',
  styleUrls: ['./permissionario-crud-moto.component.css']
})
export class PermissionarioCrudMotoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    environment.moduloSelecionado = 2;
  }

}
