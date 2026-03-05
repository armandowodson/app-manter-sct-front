import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-permissionario-crud',
  templateUrl: './permissionario-crud.component.html',
  styleUrls: ['./permissionario-crud.component.css']
})
export class PermissionarioCrudComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    environment.moduloSelecionado = 1;
  }

}
