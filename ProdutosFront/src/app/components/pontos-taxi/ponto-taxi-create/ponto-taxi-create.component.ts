import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import {PontoTaxi} from "../ponto-taxi.model";
import {PontoTaxiService} from "../../../service/ponto-taxi.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-ponto-taxi-create',
  templateUrl: './ponto-taxi-create.component.html',
})

export class PontoTaxiCreateComponent implements OnInit {

  NODE_TLS_REJECT_UNAUTHORIZED=0

  pontoTaxi: PontoTaxi = {
    idPontoTaxi: 0,
    numeroPonto: "",
    descricaoPonto: "",
    fatorRotatividade: "",
    referenciaPonto: "",
    numeroVagas: "",
    dataCriacao: "",
    usuario: ""
  };

  errors: string;
  nomeLogado: string;

  constructor(private pontoTaxiService: PontoTaxiService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
    this.errors = '';
    this.nomeLogado = "";
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
  }

  inserirPontoTaxi(): void{
    this.pontoTaxi.usuario = environment.usuarioLogado;
    this.pontoTaxiService.inserirPontoTaxi(this.pontoTaxi).subscribe(() => {
      this.pontoTaxiService.showMessageSuccess('Ponto de Táxi Criado com Sucesso!!!');
      this.router.navigate(['/ponto-taxi']);
    },
    error => {
        this.errors = error
        this.pontoTaxiService.showMessageError('Ocorreu um erro ao Criar o Ponto de Táxi!!!');
    });
  }

  voltar(): void{
    this.router.navigate(['/ponto-taxi']);
  }

}
