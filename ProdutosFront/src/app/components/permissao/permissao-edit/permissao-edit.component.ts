import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {PermissaoModelo} from "../permissao.model";
import {PermissaoService} from "../../../service/permissao.service";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {PageModelo} from "../../comum/page-modelo.model";

@Component({
  selector: 'app-permissao-edit',
  templateUrl: './permissao-edit.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class PermissaoEditComponent implements OnInit {

  minDate: Date;

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

  permissaoFiltro: PermissaoModelo = {
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
    { id: '1', nome: 'DELEGAÇÃO' },
    { id: '2', nome: 'TÍTULO PRECÁRIO' },
    { id: '3', nome: 'LICITAÇÃO' },
    { id: '4', nome: 'PRESTAÇÃO DO SERVIÇO PÚBLICO DE TRANSPORTE DE PASSAGEIROS' }
  ];

  statusPermissaoSelecionada = 0;
  statusPermissaoOptions = [
    { id: '1', nome: 'EM USO' },
    { id: '2', nome: 'SUSPENSA' },
    { id: '3', nome: 'RENUNCIADA' },
    { id: '4', nome: 'RESERVADA' },
    { id: '5', nome: 'SUBSTITUÍDA' },
    { id: '6', nome: 'REVOGADA' },
    { id: '7', nome: 'EXPIRADA' },
    { id: '8', nome: 'ABANDONADA' }
  ];

  penalidadeSelecionada = 0;
  penalidadeOptions = [
    { id: '1', nome: 'MULTA' },
    { id: '2', nome: 'SUSPENSÃO' },
    { id: '3', nome: 'CASSAÇÃO DO REGISTRO DE CONDUTOR' }
  ];

  modalidadeSelecionada = 0;
  modalidadeOptions = [
    { id: '1', nome: 'FIXO' },
    { id: '2', nome: 'ROTATIVO' },
    { id: '3', nome: 'FIXO-ROTATIVO' }
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
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    if (history.state.data) {
      this.permissao.idPermissao = history.state.data.idPermissao;
      this.permissao.numeroPermissao = history.state.data.numeroPermissao;
      this.permissao.anoPermissao = history.state.data.anoPermissao;
      this.categoriaPermissaoSelecionada = history.state.data.categoriaPermissao;
      this.permissao.categoriaPermissao = history.state.data.categoriaPermissao;
      this.statusPermissaoSelecionada = history.state.data.statusPermissao;
      this.permissao.statusPermissao = history.state.data.statusPermissao;
      this.permissao.periodoInicialStatus = history.state.data.periodoInicialStatus;
      this.permissao.periodoFinalStatus = history.state.data.periodoFinalStatus;
      this.permissao.dataValidadePermissao = history.state.data.dataValidadePermissao;
      this.penalidadeSelecionada = history.state.data.penalidade;
      this.permissao.penalidade = history.state.data.penalidade;
      this.permissao.dataValidadePenalidade = history.state.data.dataValidadePenalidade;
      this.permissao.autorizacaoTrafego = history.state.data.autorizacaoTrafego;
      this.modalidadeSelecionada = history.state.data.modalidade;
      this.permissao.modalidade = history.state.data.modalidade;
    }
  }
  editarPermissao(): void {
    this.permissaoFiltro.numeroPermissao = this.permissao.numeroPermissao;
    const request: Observable<PageModelo> = this.permissaoService.consultarPermissaoComFiltros(this.permissaoFiltro, 0, 10);
    request.subscribe({
      next: (res) => {
        if (res.totalElements > 0 && history.state.data.numeroPermissao != this.permissao.numeroPermissao) {
          this.permissaoService.showMessageAlert(
            "Já existe Permissão para o Número informado!"
          );
        }else{
          this.permissao.categoriaPermissao = this.categoriaPermissaoSelecionada;
          this.permissao.statusPermissao = this.statusPermissaoSelecionada;
          this.permissao.penalidade = this.penalidadeSelecionada;
          this.permissao.modalidade = this.modalidadeSelecionada;

          this.permissao.usuario = environment.usuarioLogado;

          if(this.validarCamposObrigatoriosPermissao() == false)
            return;

          this.permissaoService.editarPermissao(this.permissao).subscribe(() => {
              this.permissaoService.showMessageSuccess('Permissão Atualizada com Sucesso!!!');
              this.router.navigate(['/permissao']);
            },
            error => {
              this.errors = error
              this.permissaoService.showMessageError(error.message.replace("Error: ", ""));
            });
        }
      },
      error: (error) => {
        this.permissaoService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
  }

  validarCamposObrigatoriosPermissao(): boolean{
    if(this.permissao.anoPermissao == null || this.permissao.anoPermissao == ""){
      this.permissaoService.showMessageAlert("O campo Ano da Permissão é obrigatório!");
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

    if(this.permissao.periodoFinalStatus == null || this.permissao.periodoFinalStatus == ""){
      this.permissaoService.showMessageAlert("O campo Período Final da Situação é obrigatório!");
      return false;
    }

    if(this.permissao.dataValidadePermissao == null || this.permissao.dataValidadePermissao == ""){
      this.permissaoService.showMessageAlert("O campo Data de Validade da Permissão é obrigatório!");
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
    this.router.navigate(['/permissao']);
  }
}
