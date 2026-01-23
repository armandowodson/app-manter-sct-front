import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FiscalizacaoModelo} from "../fiscalizacao.model";
import {FiscalizacaoService} from "../../../service/fiscalizacao.service";
import {environment} from "../../../../environments/environment";
import {VeiculoService} from "../../../service/veiculo.service";
import {PermissionarioService} from "../../../service/permissionario.service";
import {DefensorService} from "../../../service/defensor.service";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-fiscalizacao-create',
  templateUrl: './fiscalizacao-create.component.html',
})

export class FiscalizacaoCreateComponent implements OnInit {

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
    { id: '1', nome: 'VEÍCULO IRREGULAR' },
    { id: '2', nome: 'VEÍCULO CLANDESTINO' },
    { id: '3', nome: 'VEÍCULO SEM TAXÍMETRO' }
  ];

  tipoInfracaoSelecionado = "";
  tipoInfracaoOptions = [
    { id: '1', nome: 'DEVER' },
    { id: '2', nome: 'PROIBIÇÃO' }
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
    { id: '1', nome: 'LEVE' },
    { id: '2', nome: 'MÉDIA' },
    { id: '3', nome: 'GRAVE' }
  ];

  modalidadeInfracaoSelecionada = "";
  modalidadeInfracaoOptions = [
    { id: '1', nome: 'PRIMÁRIA' },
    { id: '2', nome: 'REINCIDENTE' }
  ];

  penalidadeInfracaoSelecionada = "";
  penalidadeInfracaoOptions = [
    { id: '1', nome: 'ADVERTÊNCIA' },
    { id: '2', nome: 'MULTA' },
    { id: '3', nome: 'SUSPENSÃO' },
    { id: '4', nome: 'CASSAÇÃO' }
  ];

  errors: string;
  nomeLogado: string;

  constructor(private fiscalizacaoService: FiscalizacaoService,
              private veiculoService: VeiculoService,
              private permissionarioService: PermissionarioService,
              private defensorService: DefensorService,
              private router: Router) {
    this.errors = '';
    this.nomeLogado = "";
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
  }

  inserirFiscalizacao(): void{
    this.fiscalizacao.motivoInfracao = this.motivoInfracaoSelecionado;
    this.fiscalizacao.tipoInfracao = this.tipoInfracaoSelecionado;
    this.fiscalizacao.grupoMultas = this.grupoMultasSelecionado;
    this.fiscalizacao.naturezaInfracao = this.naturezaInfracaoSelecionada;
    this.fiscalizacao.modalidade = this.modalidadeInfracaoSelecionada;
    this.fiscalizacao.penalidade = this.penalidadeInfracaoSelecionada;

    this.fiscalizacao.usuario = environment.usuarioLogado;

    this.fiscalizacaoService.inserirFiscalizacao(this.fiscalizacao).subscribe({
      next: (response) => {
        this.fiscalizacaoService.showMessageSuccess('Fiscalização Criada com Sucesso!!!');
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
        this.fiscalizacaoService.showMessageError(error.message);
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
