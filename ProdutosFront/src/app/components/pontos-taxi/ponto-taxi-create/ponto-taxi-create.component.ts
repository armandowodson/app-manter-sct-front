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
    { id: 1, nome: 'FIXO' },
    { id: 2, nome: 'ROTATIVO' },
    { id: 3, nome: 'FIX-ROTATIVO' }
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

    if(this.validarCamposObrigatoriosPontoTaxi() == false){
      return;
    }

    this.pontoTaxiService.inserirPontoTaxi(this.pontoTaxi).subscribe({
      next: (response) => {
        this.pontoTaxiService.showMessageSuccess('Ponto de Estacionamento de Táxi Criado com Sucesso!!!');
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
