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
    anoPermissao: "",
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
    { id: '1', nome: 'DELEGAÇÃO' },
    { id: '2', nome: 'TÍTULO PRECÁRIO' },
    { id: '3', nome: 'LICITAÇÃO' },
    { id: '4', nome: 'PRESTAÇÃO DO SERVIÇO PÚBLICO DE TRANSPORTE DE PASSAGEIROS' }
  ];

  statusPermissaoSelecionada = "";
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

  penalidadeSelecionada = "";
  penalidadeOptions = [
    { id: '1', nome: 'MULTA' },
    { id: '2', nome: 'SUSPENSÃO' },
    { id: '3', nome: 'CASSAÇÃO DO REGISTRO DE CONDUTOR' }
  ];

  modalidadeSelecionada = "";
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
  }

  inserirPermissao(): void {
    const request: Observable<PageModelo> = this.permissaoService.consultarPermissaoComFiltros(this.permissao, 0, 10);
    request.subscribe({
      next: (res) => {
        if (res.totalElements > 0) {
          this.permissaoService.showMessageAlert(
            "Já existe Permissão para o Número informado!"
          );
        }else{
          this.permissao.categoriaPermissao = this.categoriaPermissaoSelecionada;
          this.permissao.statusPermissao = this.statusPermissaoSelecionada;
          this.permissao.penalidade = this.penalidadeSelecionada;
          this.permissao.modalidade = this.modalidadeSelecionada;

          this.permissao.usuario = environment.usuarioLogado;
          this.permissaoService.inserirPermissao(this.permissao).subscribe(() => {
              this.permissaoService.showMessageSuccess('Permissão Criada com Sucesso!!!');
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
