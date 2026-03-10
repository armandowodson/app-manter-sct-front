import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {VistoriaService} from "../../../service/vistoria.service";
import {VistoriaModelo} from "../vistoria-modelo.model";
import {environment} from "../../../../environments/environment";
import {VeiculoService} from "../../../service/veiculo.service";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-vistoria-create',
  templateUrl: './vistoria-create.component.html',
})

export class VistoriaCreateComponent implements OnInit {
  vistoria: VistoriaModelo = {
    idVistoria: 0,
    idVeiculo: 0,
    numeroPermissao: "",
    placa: "",
    chassiFunilariaPintura: "",
    instalacaoEletrica: "",
    farolAtlaBaixa: "",
    buzina: "",
    lanternaTraseira: "",
    freioDianteiro: "",
    luzPlaca: "",
    freioTraseiro: "",
    luzesDirecao: "",
    pneusDesgateCalibragem: "",
    luzFreio: "",
    correnteCorreia: "",
    placasDianteiraTraseira: "",
    vazamentoOleoCombustivel: "",
    limpezaGeralInterna: "",
    escapamento: "",
    assentoFixacao: "",
    equipamentosObrigatorios: "",
    espelhosRetrovisores: "",
    selosVistoria: "",
    guidaoManoplas: "",
    outros: "",
    dataVistoria: "",
    dataRetorno: "",
    statusVistoria: "",
    ressalvas: "",
    observacao: "",
    dataCriacao: "",
    usuario: "",
    status: ""
  };

  statusVistoriaSelecionada = "";
  statusVistoriaOptions = [
    { id: '1', nome: 'APROVADO' },
    { id: '2', nome: 'RESSALVAS' },
    { id: '3', nome: 'REPROVADO' }
  ];

  veiculo: any;
  comprovanteVistoriaSelecionado: File | null = null;
  errors: string;
  nomeLogado: string;

  marca: string;
  modelo: string;
  renavam: string;

  //ITENS VISTORIA
  chassiFunilariaPintura: string;
  instalacaoEletrica: string;
  farolAtlaBaixa: string;
  buzina: string;
  lanternaTraseira: string;
  freioDianteiro: string;
  luzPlaca: string;
  freioTraseiro: string;
  luzesDirecao: string;
  pneusDesgateCalibragem: string;
  luzFreio: string;
  correnteCorreia: string;
  placasDianteiraTraseira: string;
  vazamentoOleoCombustivel: string;
  limpezaGeralInterna: string;
  escapamento: string;
  assentoFixacao: string;
  equipamentosObrigatorios: string;
  espelhosRetrovisores: string;
  selosVistoria: string;
  guidaoManoplas: string;
  outros: string;

  constructor(private vistoriaService: VistoriaService,
              private veiculoService: VeiculoService,
              private router: Router) {
    this.errors = '';
    this.nomeLogado = '';
    this.chassiFunilariaPintura = "";
    this.instalacaoEletrica = "";
    this.farolAtlaBaixa = "";
    this.buzina = "";
    this.lanternaTraseira = "";
    this.freioDianteiro = "";
    this.luzPlaca = "";
    this.freioTraseiro = "";
    this.luzesDirecao = "";
    this.pneusDesgateCalibragem = "";
    this.luzFreio = "";
    this.correnteCorreia = "";
    this.placasDianteiraTraseira = "";
    this.vazamentoOleoCombustivel = "";
    this.limpezaGeralInterna = "";
    this.escapamento = "";
    this.assentoFixacao = "";
    this.equipamentosObrigatorios = "";
    this.espelhosRetrovisores = "";
    this.selosVistoria = "";
    this.guidaoManoplas = "";
    this.outros = "";

    this.marca = "";
    this.modelo = "";
    this.renavam = "";
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
  }

  getComprovanteVistoriaSelecionado (event: any): void {
    this.comprovanteVistoriaSelecionado = event.target.files[0] || null;
  }

  inserirVistoria(): void{
      this.vistoria.statusVistoria = this.statusVistoriaSelecionada;
      this.vistoria.usuario = environment.usuarioLogado;

      if(this.validarCamposObrigatoriosVistoria() == false){
        return;
      }

      if(this.vistoria.idVeiculo == null || this.vistoria.idVeiculo == 0){
        return;
      }

      this.vistoriaService.inserirVistoria(this.vistoria, this.comprovanteVistoriaSelecionado).subscribe({
        next: (response) => {
          this.vistoriaService.showMessageSuccess('Laudo de Vistoria Criado com Sucesso!!!');
          this.router.navigate(['/vistoriamoto']);
        },
        error: (error) => {
          this.vistoriaService.showMessageError(error.message.replace("Error: ", ""));
        }
      });
  }

  buscarVeiculoPlaca(){
    if(this.vistoria.placa != null && this.vistoria.placa != ''){
      this.veiculoService.buscarVeiculoPlaca(this.vistoria.placa).subscribe({
        next: (response) => {
          if (response == null || response.totalElements == 0) {
            this.veiculoService.showMessageAlert(
              "Alteração não realizada! A placa informada não existe na Base de Dados!"
            );
          }else{
            this.veiculoService.showMessageSuccess(
              "Veículo encontrado!"
            );
            this.veiculo = response;
            this.vistoria.idVeiculo = this.veiculo.idVeiculo;
            this.vistoria.numeroPermissao = this.veiculo.numeroPermissao;
            this.marca = this.veiculo.marca;
            this.modelo = this.veiculo.modelo;
            this.renavam = this.veiculo.renavam;
          }
        },
        error: (error) => {
          this.vistoriaService.showMessageError(error.message.replace("Error: ", ""));
        }
      });
    }
  }

  limparCamposVeiculo(){
    this.vistoria.placa = '';
    this.marca = '';
    this.modelo = '';
    this.renavam = '';
  }

  validarCamposObrigatoriosVistoria(): boolean{
    if(this.vistoria.placa == null || this.vistoria.placa == ''){
      this.vistoriaService.showMessageError('O campo Placa é obrigatório!');
      return false;
    }

    if(this.vistoria.dataVistoria == null || this.vistoria.dataVistoria == ''){
      this.vistoriaService.showMessageError('O campo Data da Vistoria é obrigatório!');
      return false;
    }

    if(this.vistoria.statusVistoria == null || this.vistoria.statusVistoria == ''){
      this.vistoriaService.showMessageError('O campo Status da Vistoria é obrigatório!');
      return false;
    }

    if(this.comprovanteVistoriaSelecionado?.name == null || this.comprovanteVistoriaSelecionado.name == ''){
      this.vistoriaService.showMessageAlert('O anexo do Comprovante de Vistoria é obrigatório!');
      return false;
    }

    return true;
  }

  voltar(): void{
    this.router.navigate(['/vistoriamoto']);
  }

}
