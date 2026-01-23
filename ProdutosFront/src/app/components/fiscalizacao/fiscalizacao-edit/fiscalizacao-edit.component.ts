import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {FiscalizacaoModelo} from "../fiscalizacao.model";
import {FiscalizacaoService} from "../../../service/fiscalizacao.service";
import {environment} from "../../../../environments/environment";
import {VeiculoService} from "../../../service/veiculo.service";
import {VeiculoModelo} from "../../veiculo/veiculo-modelo.model";
import {PermissionarioService} from "../../../service/permissionario.service";
import {DefensorService} from "../../../service/defensor.service";

@Component({
  selector: 'app-fiscalizacao-edit',
  templateUrl: './fiscalizacao-edit.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class FiscalizacaoEditComponent implements OnInit {

  fiscalizacao: FiscalizacaoModelo = {
    idFiscalizacao: 0,
    dataFiscalizacao: "",
    dataFiscalizacaoOriginal: "",
    idVeiculo: 0,
    placa: "",
    marca: "",
    modelo: "",
    cor: "",
    idPermissionario: 0,
    numeroPermissao: "",
    nomePermissionario: "",
    cnhPermissionario: "",
    nomeDefensor: "",
    cnhDefensor: "",
    motivoInfracao: "",
    tipoInfracao: "",
    grupoMultas: "",
    prazoRegularizacao: "",
    prazoRegularizacaoOriginal: "",
    naturezaInfracao: "",
    modalidade: "",
    penalidade: "",
    observacao: "",
    dataCriacao: "",
    usuario: "",
    status: ""
  };

  veiculo: any;
  permissionario: any;
  defensor: any;

  motivoInfracaoSelecionado = "";
  motivoInfracaoOptions = [
    { id: 'VEÍCULO IRREGULAR', nome: 'VEÍCULO IRREGULAR' },
    { id: 'VEÍCULO CLANDESTINO', nome: 'VEÍCULO CLANDESTINO' },
    { id: 'VEÍCULO SEM TAXÍMETRO', nome: 'VEÍCULO SEM TAXÍMETRO' }
  ];

  tipoInfracaoSelecionado = "";
  tipoInfracaoOptions = [
    { id: 'DEVER', nome: 'DEVER' },
    { id: 'PROIBIÇÃO', nome: 'PROIBIÇÃO' }
  ];

  grupoMultasSelecionado = "";
  grupoMultasOptions = [
    { id: '1', nome: '1' },
    { id: '2', nome: '2' },
    { id: '3', nome: '3' },
    { id: '4', nome: '4' },
    { id: '5', nome: '5' }
  ];

  naturezaInfracaoSelecionada = "";
  naturezaInfracaoOptions = [
    { id: 'LEVE', nome: 'LEVE' },
    { id: 'MÉDIA', nome: 'MÉDIA' },
    { id: 'GRAVE', nome: 'GRAVE' }
  ];

  modalidadeInfracaoSelecionada = "";
  modalidadeInfracaoOptions = [
    { id: 'PRIMÁRIA', nome: 'PRIMÁRIA' },
    { id: 'REINCIDENTE', nome: 'REINCIDENTE' }
  ];

  penalidadeInfracaoSelecionada = "";
  penalidadeInfracaoOptions = [
    { id: 'ADVERTÊNCIA', nome: 'ADVERTÊNCIA' },
    { id: 'MULTA', nome: 'MULTA' },
    { id: 'SUSPENSÃO', nome: 'SUSPENSÃO' },
    { id: 'CASSAÇÃO', nome: 'CASSAÇÃO' }
  ];

  errors: string;
  id: string;
  nomeLogado: string;

  constructor(private fiscalizacaoService: FiscalizacaoService,
              private veiculoService: VeiculoService,
              private permissionarioService: PermissionarioService,
              private defensorService: DefensorService,
              private router: Router) {
    this.errors = '';
    this.id = '';
    this.nomeLogado = "";
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    if (history.state.data) {
      this.fiscalizacao.idFiscalizacao = history.state.data.idFiscalizacao;
      this.fiscalizacao.dataFiscalizacao = history.state.data.dataFiscalizacao;
      this.fiscalizacao.idVeiculo = history.state.data.idVeiculo;
      this.fiscalizacao.placa = history.state.data.placa;
      this.fiscalizacao.marca = history.state.data.marca;
      this.fiscalizacao.modelo = history.state.data.modelo;
      this.fiscalizacao.cor = history.state.data.cor;
      this.fiscalizacao.idPermissionario = history.state.data.idPermissionario;
      this.fiscalizacao.numeroPermissao = history.state.data.numeroPermissao;
      this.fiscalizacao.nomePermissionario = history.state.data.nomePermissionario;
      this.fiscalizacao.cnhPermissionario = history.state.data.cnhPermissionario;
      this.fiscalizacao.nomeDefensor = history.state.data.nomeDefensor;
      this.fiscalizacao.cnhDefensor = history.state.data.cnhDefensor;
      this.motivoInfracaoSelecionado = history.state.data.motivoInfracao;
      this.fiscalizacao.motivoInfracao = history.state.data.motivoInfracao;
      this.tipoInfracaoSelecionado = history.state.data.tipoInfracao;
      this.fiscalizacao.tipoInfracao = history.state.data.tipoInfracao;
      this.grupoMultasSelecionado = history.state.data.grupoMultas;
      this.fiscalizacao.grupoMultas = history.state.data.grupoMultas;
      this.fiscalizacao.prazoRegularizacao = history.state.data.prazoRegularizacao;
      this.naturezaInfracaoSelecionada = history.state.data.naturezaInfracao;
      this.fiscalizacao.naturezaInfracao = history.state.data.naturezaInfracao;
      this.modalidadeInfracaoSelecionada = history.state.data.modalidade;
      this.fiscalizacao.modalidade = history.state.data.modalidade;
      this.penalidadeInfracaoSelecionada = history.state.data.penalidade;
      this.fiscalizacao.penalidade = history.state.data.penalidade;
      this.fiscalizacao.observacao = history.state.data.observacao;
      this.fiscalizacao.status = history.state.data.status;


    }
  }
  editarFiscalizacao(): void {
    this.fiscalizacao.motivoInfracao = this.motivoInfracaoSelecionado;
    this.fiscalizacao.tipoInfracao = this.tipoInfracaoSelecionado;
    this.fiscalizacao.grupoMultas = this.grupoMultasSelecionado;
    this.fiscalizacao.naturezaInfracao = this.naturezaInfracaoSelecionada;
    this.fiscalizacao.modalidade = this.modalidadeInfracaoSelecionada;
    this.fiscalizacao.penalidade = this.penalidadeInfracaoSelecionada;

    this.fiscalizacao.usuario = environment.usuarioLogado;

    this.fiscalizacaoService.editarFiscalizacao(this.fiscalizacao).subscribe({
      next: (response) => {
        this.fiscalizacaoService.showMessageSuccess('Fiscalização Atualizada com Sucesso!!!');
        this.router.navigate(['/fiscalizacao']);
      },
      error: (error) => {
        this.fiscalizacaoService.showMessageError(error.message);
      }
    });
  }

  buscarVeiculoPlaca(){
    this.veiculoService.buscarVeiculoPlaca(this.fiscalizacao.placa).subscribe({
      next: (response) => {
        this.veiculo = response;
        this.fiscalizacao.idVeiculo = this.veiculo.idVeiculo;
        this.fiscalizacao.numeroPermissao = this.veiculo.numeroPermissao;
        this.fiscalizacao.marca = this.veiculo.marca;
        this.fiscalizacao.modelo = this.veiculo.modelo;
        this.fiscalizacao.cor = this.veiculo.cor;
        this.fiscalizacao.idPermissionario = this.veiculo.idPermissionario;
        this.buscarPermissionario(this.fiscalizacao.idPermissionario);
        this.buscarDefensor(this.veiculo.numeroPermissao);
      },
      error: (error) => {
        this.fiscalizacaoService.showMessageError(error.message);
      }
    });
  }

  buscarPermissionario(idPermissionario: number){
    this.permissionarioService.consultarPermissionarioId(idPermissionario).subscribe({
      next: (response) => {
        this.permissionario = response;
        this.fiscalizacao.nomePermissionario = this.permissionario.nomePermissionario;
        this.fiscalizacao.cnhPermissionario = this.permissionario.cnhPermissionario;
      },
      error: (error) => {
        this.fiscalizacaoService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
  }

  buscarDefensor(numeroPermissao: string){
    this.defensorService.consultarDefensorNumeroPermissao(numeroPermissao).subscribe({
      next: (response) => {
        this.defensor = response;
        this.fiscalizacao.nomeDefensor = this.defensor.nomeDefensor;
        this.fiscalizacao.cnhDefensor = this.defensor.cnhDefensor;
      },
      error: (error) => {
        this.fiscalizacaoService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
  }

  voltar(): void{
    this.router.navigate(['/fiscalizacao']);
  }
}
