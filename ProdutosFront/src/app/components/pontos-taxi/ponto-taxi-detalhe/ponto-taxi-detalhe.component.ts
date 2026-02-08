import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {PontoTaxiModelo} from "../ponto-taxi.model";
import {PontoTaxiService} from "../../../service/ponto-taxi.service";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {PageModelo} from "../../comum/page-modelo.model";

@Component({
  selector: 'app-ponto-taxi-detalhe',
  templateUrl: './ponto-taxi-detalhe.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class PontoTaxiDetalheComponent implements OnInit {

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
  id: string;
  nomeLogado: string;

  pontoTaxiFiltro: PontoTaxiModelo = {
    idPontoTaxi: 0,
    numeroPonto: "",
    descricaoPonto: "",
    fatorRotatividade: "",
    referenciaPonto: "",
    numeroVagas: "",
    modalidade: "",
    dataCriacao: "",
    usuario: "",
    status: ""
  };

  constructor(private pontoTaxiService: PontoTaxiService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
    this.errors = '';
    this.id = '';
    this.nomeLogado = "";
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    if (history.state.data) {
      this.pontoTaxi.idPontoTaxi = history.state.data.idPontoTaxi;
      this.pontoTaxi.numeroPonto = history.state.data.numeroPonto;
      this.pontoTaxi.descricaoPonto = history.state.data.descricaoPonto;
      this.pontoTaxi.fatorRotatividade = "1";
      this.pontoTaxi.referenciaPonto = history.state.data.referenciaPonto;
      this.pontoTaxi.numeroVagas = history.state.data.numeroVagas;
      this.modalidadeSelecionada = history.state.data.modalidade;
      this.pontoTaxi.modalidade = history.state.data.modalidade;
    }
  }

  voltar(): void{
    this.router.navigate(['/ponto-taxi']);
  }
}
