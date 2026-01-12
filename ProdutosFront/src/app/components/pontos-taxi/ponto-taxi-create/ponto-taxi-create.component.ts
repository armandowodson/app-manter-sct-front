import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import {PontoTaxiModelo} from "../ponto-taxi.model";
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

  pontoTaxi: PontoTaxiModelo = {
    idPontoTaxi: 0,
    numeroPonto: "",
    descricaoPonto: "",
    fatorRotatividade: "1",
    referenciaPonto: "",
    numeroVagas: "",
    modalidade: "",
    dataCriacao: "",
    usuario: "",
    status: ""
  };

  modalidadeSelecionada = "";
  modalidadeOptions = [
    { id: '1', nome: 'FIXO' },
    { id: '2', nome: 'ROTATIVO' },
    { id: '3', nome: 'FIX-ROTATIVO' }
  ];

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
    this.pontoTaxi.modalidade = this.modalidadeSelecionada;
    this.pontoTaxi.usuario = environment.usuarioLogado;

    this.pontoTaxiService.inserirPontoTaxi(this.pontoTaxi).subscribe({
      next: (response) => {
        this.pontoTaxiService.showMessageSuccess('Ponto de Estacionamento de Táxi Criado com Sucesso!!!');
        this.router.navigate(['/ponto-taxi']);
      },
      error: (error) => {
        this.pontoTaxiService.showMessageError(error.message);
      }
    });
  }

  voltar(): void{
    this.router.navigate(['/ponto-taxi']);
  }

}
