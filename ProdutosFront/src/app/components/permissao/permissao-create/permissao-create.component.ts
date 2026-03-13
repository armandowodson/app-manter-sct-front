import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {PermissaoModelo} from "../permissao.model";
import {PermissaoService} from "../../../service/permissao.service";
import {environment} from "../../../../environments/environment";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-permissao-create',
  templateUrl: './permissao-create.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class PermissaoCreateComponent implements OnInit {

  minDate: Date;
  dataPipe: DatePipe;
  dataFormatada: string | null;

  permissao: PermissaoModelo = {
    idPermissao: 0,
    numeroPermissao: "",
    numeroAlvara: "",
    anoPermissao: "",
    categoriaPermissao: 0,
    statusPermissao: 0,
    periodoInicialStatus: "",
    periodoFinalStatus: "",
    dataValidadePermissao: "",
    penalidade: 0,
    dataValidadePenalidade: "",
    dataValidadePermissaoOriginal: "",
    dataCriacao: "",
    usuario: "",
    autorizacaoTrafego: "",
    modalidade: 0,
    status: ""
  };

  categoriaPermissaoSelecionada = 0;
  categoriaPermissaoOptions = [
    { id: 1, nome: 'DELEGAÇÃO' },
    { id: 2, nome: 'TÍTULO PRECÁRIO' },
    { id: 3, nome: 'LICITAÇÃO' },
    { id: 4, nome: 'PRESTAÇÃO DO SERVIÇO PÚBLICO DE TRANSPORTE DE PASSAGEIROS' }
  ];

  statusPermissaoSelecionada = 0;
  statusPermissaoOptions = [
    { id: 1, nome: 'ATIVO' },
    { id: 2, nome: 'EM USO' },
    { id: 3, nome: 'SUSPENSA' },
    { id: 4, nome: 'RENUNCIADA' },
    { id: 5, nome: 'RESERVADA' },
    { id: 6, nome: 'SUBSTITUÍDA' },
    { id: 7, nome: 'REVOGADA' },
    { id: 8, nome: 'EXPIRADA' },
    { id: 9, nome: 'ABANDONADA' }
  ];

  penalidadeSelecionada = 0;
  penalidadeOptions = [
    { id: 1, nome: 'MULTA' },
    { id: 2, nome: 'SUSPENSÃO' },
    { id: 3, nome: 'CASSAÇÃO DO REGISTRO DE CONDUTOR' }
  ];

  modalidadeSelecionada = 0;
  modalidadeOptions = [
    { id: 1, nome: 'FIXO' },
    { id: 2, nome: 'ROTATIVO' },
    { id: 3, nome: 'FIXO-ROTATIVO' }
  ];

  errors: string;
  id: string;
  nomeLogado: string;

  constructor(private permissaoService: PermissaoService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
    this.errors = '';
    this.id = '';
    this.nomeLogado = "";
    this.minDate = new Date();
    this.dataPipe = new DatePipe('en-US');
    this.dataFormatada = "";
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    this.statusPermissaoSelecionada = 1;
    const dataFutura = new Date();
    this.permissao.anoPermissao = dataFutura.getFullYear().toString();
    dataFutura.setDate(dataFutura.getDate() + 1);
    this.dataFormatada = this.dataPipe.transform(dataFutura, 'yyyy-MM-dd');
    if (this.dataFormatada != null) {
      this.permissao.periodoInicialStatus = this.dataFormatada;
    }
    dataFutura.setFullYear(dataFutura.getFullYear() + 3);
    this.dataFormatada = this.dataPipe.transform(dataFutura, 'yyyy-MM-dd');
    if (this.dataFormatada != null) {
      this.permissao.dataValidadePermissao = this.dataFormatada;
    }
  }

  inserirPermissao(): void {
    this.permissao.categoriaPermissao = this.categoriaPermissaoSelecionada;
    this.permissao.statusPermissao = this.statusPermissaoSelecionada;
    this.permissao.penalidade = this.penalidadeSelecionada;
    this.permissao.modalidade = this.modalidadeSelecionada;

    this.permissao.usuario = environment.usuarioLogado;

    if(this.validarCamposObrigatoriosPermissao() == false)
      return;

    this.permissaoService.inserirPermissao(this.permissao).subscribe(() => {
        this.permissaoService.showMessageSuccess('Termo de Autorização Criado com Sucesso!!!');
        this.router.navigate(['/permissaomoto']);
      },
      error => {
        this.errors = error
        this.permissaoService.showMessageError(error.message.replace("Error: ", ""));
      });
  }

  validarCamposObrigatoriosPermissao(): boolean{
    if(this.permissao.anoPermissao == null || this.permissao.anoPermissao == ""){
      this.permissaoService.showMessageAlert("O campo Ano do Termo de Autorização é obrigatório!");
      return false;
    }

    if(this.permissao.categoriaPermissao == null || this.permissao.categoriaPermissao == 0){
      this.permissaoService.showMessageAlert("O campo Categoria é obrigatório!");
      return false;
    }

    if(this.permissao.statusPermissao == null || this.permissao.statusPermissao == 0){
      this.permissaoService.showMessageAlert("O campo Status é obrigatório!");
      return false;
    }

    if(this.permissao.periodoInicialStatus == null || this.permissao.periodoInicialStatus == ""){
      this.permissaoService.showMessageAlert("O campo Período Inicial da Situação é obrigatório!");
      return false;
    }

    if(this.permissao.dataValidadePermissao == null || this.permissao.dataValidadePermissao == ""){
      this.permissaoService.showMessageAlert("O campo Data de Validade do Termo de Autorização é obrigatório!");
      return false;
    }

    if(this.permissao.autorizacaoTrafego == null || this.permissao.autorizacaoTrafego == ""){
      this.permissaoService.showMessageAlert("O campo Autorizacao de Trafego é obrigatório!");
      return false;
    }

    if(this.permissao.modalidade == null || this.permissao.modalidade == 0){
      this.permissaoService.showMessageAlert("O campo Modalidade é obrigatório!");
      return false;
    }

    return true;
  }

  voltar(): void{
    this.router.navigate(['/permissaomoto']);
  }
}
