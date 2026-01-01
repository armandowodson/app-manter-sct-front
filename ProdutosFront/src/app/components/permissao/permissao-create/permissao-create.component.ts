import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {PermissaoModelo} from "../permissao.model";
import {PermissaoService} from "../../../service/permissao.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-permissao-edit',
  templateUrl: './permissao-create.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class PermissaoCreateComponent implements OnInit {

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
    { id: '1', nome: 'DELEGAÇÃO' },
    { id: '2', nome: 'TÍTULO PRECÁRIO' },
    { id: '3', nome: 'LICITAÇÃO' },
    { id: '4', nome: 'PRESTAÇÃO DO SERVIÇO PÚBLICO DE TRANSPORTE DE PASSAGEIROS' }
  ];

  statusPermissaoSelecionada = "";
  statusPermissaoOptions = [
    { id: '1', nome: 'ATIVA' },
    { id: '2', nome: 'SUSPENSA' },
    { id: '3', nome: 'RENUNCIADA' },
    { id: '4', nome: 'RESERVADA' },
    { id: '5', nome: 'SUBSTITUÍDA' },
    { id: '6', nome: 'REVOGADA' },
    { id: '7', nome: 'EXPIRADA' },
    { id: '8', nome: 'ABANDONADA' }
  ];

  penalidadeSelecionada = "";
  penalidadeOptions = [
    { id: '1', nome: 'MULTA' },
    { id: '2', nome: 'SUSPENSÃO' },
    { id: '3', nome: 'CASSAÇÃO DO REGISTRO DE CONDUTOR' }
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
  }

  inserirPermissao(): void {
    this.permissao.categoriaPermissao = this.categoriaPermissaoSelecionada;
    this.permissao.statusPermissao = this.statusPermissaoSelecionada;
    this.permissao.penalidade = this.penalidadeSelecionada;
    this.permissao.usuario = environment.usuarioLogado;
    this.permissaoService.inserirPermissao(this.permissao).subscribe(() => {
      this.permissaoService.showMessageSuccess('Permissão Criada com Sucesso!!!');
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
