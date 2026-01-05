import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {VeiculoModelo} from "../veiculo-modelo.model";
import {VeiculoService} from "../../../service/veiculo.service";
import {environment} from "../../../../environments/environment";
import {PermissionarioService} from "../../../service/permissionario.service";

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
    tipoVeiculo: "",
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

  tipoVeiculoSelecionado = "";
  tipoVeiculoOptions = [
    { id: '1', nome: 'CONVENCIONAL' },
    { id: '2', nome: 'EXECUTIVO' },
    { id: '3', nome: 'ESPECIAL' }
  ];

  permissionarioSelecionado = "";
  permissionariosOptions: any[] = [];

  crlvSelecionado: File | null = null;
  comprovanteVistoriaSelecionado: File | null = null;
  errors: string;
  id: number;
  nomeLogado: string;

  constructor(private veiculoService: VeiculoService,
              private permissionarioService: PermissionarioService,
              private router: Router) {
    this.errors = '';
    this.id = 0;
    this.nomeLogado = "";
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    if (history.state.data) {
      this.permissionarioService.consultarPermissionariosDisponiveisAlteracao(history.state.data.idPermissionario).subscribe(
        (permissionarios) => {
          if (permissionarios == null || permissionarios.length == 0) {
            this.veiculoService.showMessageAlert(
              "Não há Permissionário disponível para seleção!"
            );
          }
          permissionarios?.forEach(element => {
            this.permissionariosOptions.push({ id: element.idPermissionario, nome: element.nomePermissionario });
          });
        },
        (error) => {
          this.errors = error;
          this.veiculoService.showMessageError(this.errors);
        }
      );

      this.veiculo.idVeiculo = history.state.data.idVeiculo;
      this.permissionarioSelecionado = history.state.data.idPermissionario;
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
      this.tipoVeiculoSelecionado = history.state.data.tipoVeiculo;
      this.veiculo.numeroCrlv = history.state.data.numeroCrlv;
      this.veiculo.anoCrlv = history.state.data.anoCrlv;
      this.veiculo.certificadoAfericao = history.state.data.certificadoAfericao;
      this.veiculo.observacao = history.state.data.observacao;
    }
  }
  getCrlvSelecionado (event: any): void {
    this.crlvSelecionado = event.target.files[0] || null;
  }

  getComprovanteVistoriaSelecionado (event: any): void {
    this.comprovanteVistoriaSelecionado = event.target.files[0] || null;
  }

  carregarPermissao(permissionario: any){
      this.permissionarioService.consultarPermissionarioId(permissionario.value).subscribe({
        next: (response) => {
          if (response == null) {
            this.veiculoService.showMessageAlert(
              "Não foram encontradas Permissões disponíveis para o cadastro do Veículo!"
            );
          }
          this.veiculo.numeroPermissao = response.numeroPermissao;
        },
        error: (error) => {
          this.veiculoService.showMessageError(error.message);
        }
      });
  }

  editarVeiculo(): void{
      this.veiculo.cor = this.corSelecionada;
      this.veiculo.combustivel = this.combustivelSelecionado;
      this.veiculo.situacaoVeiculo = this.situacaoVeiculoSelecionada;
      this.veiculo.tipoVeiculo = this.tipoVeiculoSelecionado;
      this.veiculo.idPermissionario = this.permissionarioSelecionado;
      this.veiculo.usuario = environment.usuarioLogado;

      this.veiculoService.editarVeiculo(this.veiculo, this.crlvSelecionado, this.comprovanteVistoriaSelecionado).subscribe({
        next: (response) => {
          this.veiculoService.showMessageSuccess('Veículo Atualizado com Sucesso!!!');
          this.router.navigate(['/veiculo']);
        },
        error: (error) => {
          this.veiculoService.showMessageError(error.message);
        }
      });
  }

  voltar(): void{
    this.router.navigate(['/veiculo']);
  }
}
