import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {PermissaoModelo} from "../permissao.model";
import {PermissaoService} from "../../../service/permissao.service";
import {environment} from "../../../../environments/environment";

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
    usuario: ""
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
    { id: 'ATIVA', nome: 'ATIVA' },
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
    }
  }
  editarPermissao(): void {
    this.permissao.categoriaPermissao = this.categoriaPermissaoSelecionada;
    this.permissao.statusPermissao = this.statusPermissaoSelecionada;
    this.permissao.penalidade = this.penalidadeSelecionada;
    this.permissao.usuario = environment.usuarioLogado;
    this.permissaoService.editarPermissao(this.permissao).subscribe(() => {
      this.permissaoService.showMessageSuccess('Permissão Atualizada com Sucesso!!!');
      this.router.navigate(['/permissao']);
    },
    error => {
        this.errors = error
        this.permissaoService.showMessageError(this.errors);
    });
  }

  voltar(): void{
    this.router.navigate(['/permissao']);
  }
}
