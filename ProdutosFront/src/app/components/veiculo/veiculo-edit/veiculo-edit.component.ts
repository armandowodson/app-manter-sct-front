import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {VeiculoModelo} from "../veiculo-modelo.model";
import {VeiculoService} from "../../../service/veiculo.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-permissinario-edit',
  templateUrl: './veiculo-edit.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class VeiculoEditComponent implements OnInit {

  // @ts-ignore
  // @ts-ignore
  veiculo: VeiculoModelo = {
    idVeiculo: 0,
    idPermissionario: "",
    numeroPermissao: "",
    placa: "",
    renavam: "",
    chassi: "",
    anoFabricacao: "",
    marca: "",
    modelo: "",
    anoModelo: "",
    cor: "",
    combustivel: "",
    numeroTaximetro: "",
    anoRenovacao: "",
    dataVistoria: "",
    dataRetorno: "",
    situacaoVeiculo: "",
    numeroCrlv: "",
    anoCrlv: "",
    certificadoAfericao: "",
    observacao: "",
    dataCriacao: "",
    usuario: ""
  };

  corSelecionada = "";
  corOptions = [
    { id: 1, nome: 'BRANCO' },
    { id: 2, nome: 'PRATA' },
    { id: 3, nome: 'CINZA' }
  ];

  combustivelSelecionado = "";
  combustivelOptions = [
    { id: '1', nome: 'GASOLINA' },
    { id: '2', nome: 'ÁLCOOL/ETANOL' },
    { id: '3', nome: 'DIESEL' },
    { id: '4', nome: 'GÁS NATURAL' },
    { id: '5', nome: 'ELETRICIDADE' }
  ];

  situacaoVeiculoSelecionada = "";
  situacaoVeiculoOptions = [
    { id: '1', nome: 'CONSERVADO' },
    { id: '2', nome: 'EM BOM ESTADO' },
    { id: '3', nome: 'ARRANHADO' },
    { id: '4', nome: 'AMASSADO' },
    { id: '5', nome: 'PNEUS CARECAS' }
  ];

  crlvSelecionado: File | null = null;
  comprovanteVistoriaSelecionado: File | null = null;
  errors: string;
  id: number;

  constructor(private veiculoService: VeiculoService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
    this.errors = '';
    this.id = 0;
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.veiculo.idVeiculo = history.state.data.idVeiculo;
      this.veiculo.idPermissionario = history.state.data.idPermissionario;
      this.veiculo.numeroPermissao = history.state.data.numeroPermissao;
      this.veiculo.placa = history.state.data.placa;
      this.veiculo.renavam = history.state.data.renavam;
      this.veiculo.chassi = history.state.data.chassi;
      this.veiculo.anoFabricacao = history.state.data.anoFabricacao;
      this.veiculo.marca = history.state.data.marca;
      this.veiculo.modelo = history.state.data.modelo;
      this.veiculo.anoModelo = history.state.data.anoModelo;
      this.corSelecionada = history.state.data.cor;
      this.combustivelSelecionado = history.state.data.combustivel;
      this.veiculo.numeroTaximetro = history.state.data.numeroTaximetro;
      this.veiculo.anoRenovacao = history.state.data.anoRenovacao;
      this.veiculo.dataVistoria = history.state.data.dataVistoria;
      this.veiculo.dataRetorno = history.state.data.dataRetorno;
      this.situacaoVeiculoSelecionada = history.state.data.situacaoVeiculo;
      this.veiculo.numeroCrlv = history.state.data.numeroCrlv;
      this.veiculo.anoCrlv = history.state.data.anoCrlv;
      this.veiculo.certificadoAfericao = history.state.data.certificadoAfericao;
      this.veiculo.observacao = history.state.data.observacao;
    }
  }

  consultarVeiculoId(id: number){
    this.veiculo.idVeiculo = id;
    this.veiculoService.consultarVeiculoId(this.veiculo).subscribe(veic => {
        if (veic == null){
            this.veiculoService.showMessageAlert('A consulta não retornou resultado!');
        }
        this.veiculo.idVeiculo = veic.idVeiculo;
        this.veiculo.idPermissionario = veic.idPermissionario;
        this.veiculo.numeroPermissao = veic.numeroPermissao;
        this.veiculo.placa = veic.placa;
        this.veiculo.renavam = veic.renavam;
        this.veiculo.chassi = veic.chassi;
        this.veiculo.anoFabricacao = veic.anoFabricacao;
        this.veiculo.marca = veic.marca;
        this.veiculo.modelo = veic.modelo;
        this.veiculo.anoModelo = veic.anoModelo;
        this.corSelecionada = veic.cor;
        this.combustivelSelecionado = veic.combustivel;
        this.veiculo.numeroTaximetro = veic.numeroTaximetro;
        this.veiculo.anoRenovacao = veic.anoRenovacao;
        this.veiculo.dataVistoria = veic.dataVistoria;
        this.veiculo.dataRetorno = veic.dataRetorno;
        this.situacaoVeiculoSelecionada = veic.situacaoVeiculo;
        this.veiculo.numeroCrlv = veic.numeroCrlv;
        this.veiculo.anoCrlv = veic.anoCrlv;
        this.veiculo.certificadoAfericao = veic.certificadoAfericao;
        this.veiculo.observacao = veic.observacao;
      },
      error => {
        this.errors = error
        this.veiculoService.showMessageError(this.errors);
    });
  }

  getCrlSelecionado (event: any): void {
    this.crlvSelecionado = event.target.files[0] || null;
  }

  getComprovanteVistoriaSelecionado (event: any): void {
    this.comprovanteVistoriaSelecionado = event.target.files[0] || null;
  }

  editarVeiculo(): void{
    this.veiculo.cor = this.corSelecionada;
    this.veiculo.combustivel = this.combustivelSelecionado;
    this.veiculo.situacaoVeiculo = this.situacaoVeiculoSelecionada;
    this.veiculo.usuario = environment.usuarioLogado;
    this.veiculoService.editarVeiculo(this.veiculo, this.crlvSelecionado, this.comprovanteVistoriaSelecionado).subscribe(() => {
        this.veiculoService.showMessageSuccess('Veículo Atualizado com Sucesso!!!');
        this.router.navigate(['/veiculo']);
      },
      error => {
        this.errors = error
        this.veiculoService.showMessageError('Ocorreu um erro ao Atualizar o Veículo!!!');
      });
  }

  voltar(): void{
    this.router.navigate(['/veiculo']);
  }
}
