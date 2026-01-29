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
  selector: 'app-ponto-taxi-edit',
  templateUrl: './ponto-taxi-edit.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class PontoTaxiEditComponent implements OnInit {

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
  editarPontoTaxi(): void {
    this.pontoTaxiFiltro.numeroPonto = this.pontoTaxi.numeroPonto;
    const request: Observable<PageModelo> = this.pontoTaxiService.consultarPontosTaxiComFiltros(this.pontoTaxiFiltro, 0, 10);
    request.subscribe({
      next: (res) => {
        if (res.totalElements > 0 && history.state.data.numeroPonto != this.pontoTaxi.numeroPonto) {
          this.pontoTaxiService.showMessageAlert(
            "Já existe o Número do Ponto informado!"
          );
        }
      },
      error: (error) => {
        this.pontoTaxiService.showMessageError(error.message.replace("Error: ", ""));
      }
    });

    this.pontoTaxi.modalidade = this.modalidadeSelecionada;
    this.pontoTaxi.usuario = environment.usuarioLogado;

    if(this.validarCamposObrigatoriosPontoTaxi() == false){
      return;
    }

    this.pontoTaxiService.editarPontoTaxi(this.pontoTaxi).subscribe({
      next: (response) => {
        this.pontoTaxiService.showMessageSuccess('Ponto de Estacionamento de Táxi Atualizado com Sucesso!!!');
        this.router.navigate(['/ponto-taxi']);
      },
      error: (error) => {
        this.pontoTaxiService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
  }

  validarCamposObrigatoriosPontoTaxi(): boolean{
    if(this.pontoTaxi.numeroPonto == null || this.pontoTaxi.numeroPonto == undefined || this.pontoTaxi.numeroPonto == ''){
      this.pontoTaxiService.showMessageAlert('O campo Número do Ponto é obrigatório!');
      return false;
    }
    if(this.pontoTaxi.descricaoPonto == null || this.pontoTaxi.descricaoPonto == undefined || this.pontoTaxi.descricaoPonto == ''){
      this.pontoTaxiService.showMessageAlert('O campo Nome/Descrição do Ponto é obrigatório!');
      return false;
    }
    if(this.pontoTaxi.numeroVagas == null || this.pontoTaxi.numeroVagas == undefined || this.pontoTaxi.numeroVagas == ''){
      this.pontoTaxiService.showMessageAlert('O campo Nº de Vagas do Ponto é obrigatório!');
      return false;
    }
    if(this.pontoTaxi.referenciaPonto == null || this.pontoTaxi.referenciaPonto == undefined || this.pontoTaxi.referenciaPonto == ''){
      this.pontoTaxiService.showMessageAlert('O campo Ponto Referência é obrigatório!');
      return false;
    }
    if(this.pontoTaxi.modalidade == null || this.pontoTaxi.modalidade == undefined || this.pontoTaxi.modalidade == ''){
      this.pontoTaxiService.showMessageAlert('O campo Modalidade é obrigatório!');
      return false;
    }

    return true;
  }

  voltar(): void{
    this.router.navigate(['/ponto-taxi']);
  }
}
