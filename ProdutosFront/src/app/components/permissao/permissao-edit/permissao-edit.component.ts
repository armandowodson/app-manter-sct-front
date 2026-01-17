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
    anoAlvara: "",
    categoriaPermissao: "",
    statusPermissao: "",
    periodoInicialStatus: "",
    periodoFinalStatus: "",
    dataValidadePermissao: "",
    penalidade: "",
    dataValidadePenalidade: "",
    dataValidadePermissaoOriginal: "",
    dataCriacao: "",
    usuario: "",
    autorizacaoTrafego: "",
    modalidade: "",
    status: ""
  };

  permissaoFiltro: PermissaoModelo = {
    idPermissao: 0,
    numeroPermissao: "",
    numeroAlvara: "",
    anoAlvara: "",
    categoriaPermissao: "",
    statusPermissao: "",
    periodoInicialStatus: "",
    periodoFinalStatus: "",
    dataValidadePermissao: "",
    penalidade: "",
    dataValidadePenalidade: "",
    dataValidadePermissaoOriginal: "",
    dataCriacao: "",
    usuario: "",
    autorizacaoTrafego: "",
    modalidade: "",
    status: ""
  };

  categoriaPermissaoSelecionada = "";
  categoriaPermissaoOptions = [
    { id: 'DELEGAÇÃO', nome: 'DELEGAÇÃO' },
    { id: 'TÍTULO PRECÁRIO', nome: 'TÍTULO PRECÁRIO' },
    { id: 'LICITAÇÃO', nome: 'LICITAÇÃO' },
    { id: 'PRESTAÇÃO DO SERVIÇO PÚBLICO DE TRANSPORTE DE PASSAGEIROS', nome: 'PRESTAÇÃO DO SERVIÇO PÚBLICO DE TRANSPORTE DE PASSAGEIROS' }
  ];

  statusPermissaoSelecionada = "";
  statusPermissaoOptions = [
    { id: 'EM USO', nome: 'EM USO' },
    { id: 'SUSPENSA', nome: 'SUSPENSA' },
    { id: 'RENUNCIADA', nome: 'RENUNCIADA' },
    { id: 'RESERVADA', nome: 'RESERVADA' },
    { id: 'SUBSTITUÍDA', nome: 'SUBSTITUÍDA' },
    { id: 'REVOGADA', nome: 'REVOGADA' },
    { id: 'EXPIRADA', nome: 'EXPIRADA' },
    { id: 'ABANDONADA', nome: 'ABANDONADA' }
  ];

  penalidadeSelecionada = "";
  penalidadeOptions = [
    { id: 'MULTA', nome: 'MULTA' },
    { id: 'SUSPENSÃO', nome: 'SUSPENSÃO' },
    { id: 'CASSAÇÃO DO REGISTRO DE CONDUTOR', nome: 'CASSAÇÃO DO REGISTRO DE CONDUTOR' }
  ];

  modalidadeSelecionada = "";
  modalidadeOptions = [
    { id: 'FIXO', nome: 'FIXO' },
    { id: 'ROTATIVO', nome: 'ROTATIVO' },
    { id: 'FIXO-ROTATIVO', nome: 'FIXO-ROTATIVO' }
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
      this.permissao.numeroAlvara = history.state.data.numeroAlvara;
      this.permissao.anoAlvara = history.state.data.anoAlvara;
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

  voltar(): void{
    this.router.navigate(['/permissao']);
  }
}
