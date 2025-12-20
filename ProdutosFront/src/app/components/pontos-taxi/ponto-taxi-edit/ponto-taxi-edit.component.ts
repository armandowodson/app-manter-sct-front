import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {PontoTaxi} from "../ponto-taxi.model";
import {PontoTaxiService} from "../../../service/ponto-taxi.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-ponto-taxi-edit',
  templateUrl: './ponto-taxi-edit.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class PontoTaxiEditComponent implements OnInit {

  pontoTaxi: PontoTaxi = {
    idPontoTaxi: 0,
    numeroPonto: "",
    descricaoPonto: "",
    fatorRotatividade: "",
    referenciaPonto: "",
    numeroVagas: "",
    modalidade: "",
    dataCriacao: "",
    usuario: ""
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
      this.pontoTaxi.fatorRotatividade = history.state.data.fatorRotatividade;
      this.pontoTaxi.referenciaPonto = history.state.data.referenciaPonto;
      this.pontoTaxi.numeroVagas = history.state.data.numeroVagas;
      this.modalidadeSelecionada = history.state.data.modalidade;
      this.pontoTaxi.modalidade = history.state.data.modalidade;
    }
  }
  editarPontoTaxi(): void {
    this.pontoTaxi.modalidade = this.modalidadeSelecionada;
    this.pontoTaxi.usuario = environment.usuarioLogado;
    this.pontoTaxiService.editarPontoTaxi(this.pontoTaxi).subscribe(() => {
      this.pontoTaxiService.showMessageSuccess('Ponto de Táxi Atualizado com Sucesso!!!');
      this.router.navigate(['/ponto-taxi']);
    },
    error => {
        this.errors = error
        this.pontoTaxiService.showMessageError(this.errors);
    });
  }

  voltar(): void{
    this.router.navigate(['/ponto-taxi']);
  }
}
