import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import {VeiculoService} from "../../../service/veiculo.service";
import {VeiculoModelo} from "../veiculo-modelo.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-veiculo-create',
  templateUrl: './veiculo-create.component.html',
})

export class VeiculoCreateComponent implements OnInit {

  NODE_TLS_REJECT_UNAUTHORIZED=0

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
    { id: 1, nome: 'GASOLINA' },
    { id: 2, nome: 'ÁLCOOL/ETANOL' },
    { id: 3, nome: 'DIESEL' },
    { id: 4, nome: 'GÁS NATURAL' },
    { id: 5, nome: 'ELETRICIDADE' }
  ];

  situacaoVeiculoSelecionada = "";
  situacaoVeiculoOptions = [
    { id: 1, nome: 'CONSERVADO' },
    { id: 2, nome: 'EM BOM ESTADO' },
    { id: 3, nome: 'ARRANHADO' },
    { id: 4, nome: 'AMASSADO' },
    { id: 5, nome: 'PNEUS CARECAS' }
  ];

  crlvSelecionado: File | null = null;
  comprovanteVistoriaSelecionado: File | null = null;
  errors: string;

  constructor(private veiculoService: VeiculoService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
    this.errors = '';
  }

  ngOnInit(): void {

  }

  getCrlvSelecionado (event: any): void {
    this.crlvSelecionado = event.target.files[0] || null;
  }

  getComprovanteVistoriaSelecionado (event: any): void {
    this.comprovanteVistoriaSelecionado = event.target.files[0] || null;
  }

  inserirVeiculo(): void{
    this.veiculo.cor = this.corSelecionada;
    this.veiculo.combustivel = this.combustivelSelecionado;
    this.veiculo.situacaoVeiculo = this.situacaoVeiculoSelecionada;
    this.veiculo.usuario = environment.usuarioLogado;
    this.veiculoService.inserirVeiculo(this.veiculo, this.crlvSelecionado,
      this.comprovanteVistoriaSelecionado).subscribe(() => {
      this.veiculoService.showMessageSuccess('Veículo Criado com Sucesso!!!');
      this.router.navigate(['/veiculo']);
    },
    error => {
        this.errors = error
        this.veiculoService.showMessageError('Ocorreu um erro ao Criar o Veículo!!!');
    });
  }

  voltar(): void{
    this.router.navigate(['/veiculo']);
  }

}
