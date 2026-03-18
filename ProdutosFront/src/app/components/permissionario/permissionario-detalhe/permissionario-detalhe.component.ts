import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {PermissionarioModelo} from "../permissionario-modelo.model";
import {PermissionarioService} from "../../../service/permissionario.service";
import {environment} from "../../../../environments/environment";
import {PermissaoService} from "../../../service/permissao.service";

@Component({
  selector: 'app-permissinario-detalhe',
  templateUrl: './permissionario-detalhe.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class PermissionarioDetalheComponent implements OnInit {

  // @ts-ignore
  // @ts-ignore
  permissionario: PermissionarioModelo = {
    idPermissionario: 0,
    numeroPermissao: "",
    nomePermissionario: "",
    cpfPermissionario: "",
    rgPermissionario: "",
    orgaoEmissor: "",
    filiacaoMae: "",
    filiacaoPai: "",
    sexo: "",
    estadoCivil: "",
    dataNascimento: "",
    ufPermissionario: "",
    cidadePermissionario: "",
    bairroPermissionario: "",
    enderecoPermissionario: "",
    cep: "",
    celularPermissionario: "",
    emailPermissionario: "",
    cnhPermissionario: "",
    categoriaCnhPermissionario: "",
    dataValidadeCnh: "",
    numeroQuitacaoMilitar: "",
    numeroQuitacaoEleitoral: "",
    numeroInscricaoInss: "",
    numeroCertificadoCondutor: "",
    dataValidadeCertificadoCondutor: "",
    dataCriacao: "",
    usuario: "",
    status: "",
    aplicativoAlternativo: "",
    observacao: ""
  };

  ufSelecionada = "";
  ufOptions = [
    {sigla:'AC',nome:'AC'},
    {sigla:'AL',nome:'AL'},
    {sigla:'AP',nome:'AP'},
    {sigla:'AM',nome:'AM'},
    {sigla:'BA',nome:'BA'},
    {sigla:'CE',nome:'CE'},
    {sigla:'ES',nome:'ES'},
    {sigla:'GO',nome:'GO'},
    {sigla:'MA',nome:'MA'},
    {sigla:'MT',nome:'MT'},
    {sigla:'MS',nome:'MS'},
    {sigla:'MG',nome:'MG'},
    {sigla:'PA',nome:'PA'},
    {sigla:'PB',nome:'PB'},
    {sigla:'PR',nome:'PR'},
    {sigla:'PE',nome:'PE'},
    {sigla:'PI',nome:'PI'},
    {sigla:'RJ',nome:'RJ'},
    {sigla:'RN',nome:'RN'},
    {sigla:'RS',nome:'RS'},
    {sigla:'RO',nome:'RO'},
    {sigla:'RR',nome:'RR'},
    {sigla:'SC',nome:'SC'},
    {sigla:'SP',nome:'SP'},
    {sigla:'SE',nome:'SE'},
    {sigla:'TO',nome:'TO'}
  ];

  categoriaCnhSelecionada = "";
  categoriaOptions = [
    { id: '1', nome: 'A' },
    { id: '2', nome: 'AB' },
    { id: '3', nome: 'B' },
    { id: '4', nome: 'C' },
    { id: '5', nome: 'D' }
  ];

  aplicativoAlternativoSelecionado = "";
  aplicativoAlternativoOptions = [
    { id: '1', nome: 'SIM' },
    { id: '2', nome: 'NÃO' }
  ];

  sexoSelecionado = "";
  sexoOptions = [
    { id: '1', nome: 'MASCULINO' },
    { id: '2', nome: 'FEMININO' }
  ];

  estadoCivilSelecionado = "";
  estadoCivilOptions = [
    { id: '1', nome: 'SOLTEIRO' },
    { id: '2', nome: 'CASADO' },
    { id: '3', nome: 'SEPARADO' },
    { id: '4', nome: 'DIVORCIADO' },
    { id: '5', nome: 'VIÚVO' }
  ];

  statusSelecionado = "";
  statusOptions = [
    { id: '1', nome: 'ATIVO' },
    { id: '2', nome: 'INATIVO' },
    { id: '3', nome: 'SUSPENSO' },
    { id: '4', nome: 'CASSADO' }
  ];

  anexoRgSelecionado: File | null = null;
  anexoCpfSelecionado: File | null = null;
  anexoCnhSelecionada: File | null = null;
  comprovanteResidenciaSelecionada: File | null = null;
  certidaoNegativaMunicipalSelecionada: File | null = null;
  certidaoNegativaCriminalSelecionada: File | null = null;
  certificadoPropriedadeSelecionada: File | null = null;
  certificadoCondutorSelecionado: File | null = null;
  apoliceSeguroVidaSelecionada: File | null = null;
  apoliceSeguroMotocicletaSelecionada: File | null = null;
  fotoSelecionada: File | null = null;

  errors: string;
  id: string;
  nomeLogado: string;

  constructor(private permissionarioService: PermissionarioService,
              private router: Router) {
    this.errors = '';
    this.id = '';
    this.nomeLogado = '';
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.permissionario.idPermissionario = history.state.data.idPermissionario;
      this.permissionario.numeroPermissao = history.state.data.numeroPermissao;
      this.permissionario.nomePermissionario = history.state.data.nomePermissionario;
      this.permissionario.cpfPermissionario = history.state.data.cpfPermissionario;
      this.permissionario.rgPermissionario = history.state.data.rgPermissionario;
      this.permissionario.orgaoEmissor = history.state.data.orgaoEmissor;
      this.permissionario.filiacaoMae = history.state.data.filiacaoMae;
      this.permissionario.filiacaoPai = history.state.data.filiacaoPai;
      this.sexoSelecionado = history.state.data.sexo;
      this.permissionario.sexo = history.state.data.sexo;
      this.estadoCivilSelecionado = history.state.data.estadoCivil;
      this.permissionario.estadoCivil = history.state.data.estadoCivil;
      this.permissionario.dataNascimento = history.state.data.dataNascimento;
      this.permissionario.cnhPermissionario = history.state.data.cnhPermissionario;
      this.categoriaCnhSelecionada = history.state.data.categoriaCnhPermissionario;
      this.permissionario.categoriaCnhPermissionario = history.state.data.categoriaCnhPermissionario;
      this.permissionario.dataValidadeCnh = history.state.data.dataValidadeCnh;
      this.ufSelecionada = history.state.data.ufPermissionario;
      this.permissionario.ufPermissionario = history.state.data.ufPermissionario;
      this.permissionario.cidadePermissionario = history.state.data.cidadePermissionario;
      this.permissionario.bairroPermissionario = history.state.data.bairroPermissionario;
      this.permissionario.enderecoPermissionario = history.state.data.enderecoPermissionario;
      this.permissionario.cep = history.state.data.cep;
      this.permissionario.celularPermissionario = history.state.data.celularPermissionario;
      this.permissionario.emailPermissionario = history.state.data.emailPermissionario;
      this.permissionario.numeroQuitacaoMilitar = history.state.data.numeroQuitacaoMilitar;
      this.permissionario.numeroQuitacaoEleitoral = history.state.data.numeroQuitacaoEleitoral;
      this.permissionario.numeroInscricaoInss = history.state.data.numeroInscricaoInss;
      this.permissionario.numeroCertificadoCondutor = history.state.data.numeroCertificadoCondutor;
      this.permissionario.dataValidadeCertificadoCondutor = history.state.data.dataValidadeCertificadoCondutor;
      this.aplicativoAlternativoSelecionado = history.state.data.aplicativoAlternativo;
      this.permissionario.aplicativoAlternativo = history.state.data.aplicativoAlternativo;
      this.permissionario.observacao = history.state.data.observacao;
      this.statusSelecionado = this.carregarStatus(history.state.data.status);
      this.permissionario.status = history.state.data.status;
      this.nomeLogado = environment.nomeLogado;
    }
  }

  getAnexoRgSelecionado (event: any): void {
    this.anexoRgSelecionado = event.target.files[0] || null;
  }

  getAnexoCpfSelecionado (event: any): void {
    this.anexoCpfSelecionado = event.target.files[0] || null;
  }

  getAnexoCnhSelecionada (event: any): void {
    this.anexoCnhSelecionada = event.target.files[0] || null;
  }

  getComprovanteResidenciaSelecionada (event: any): void {
    this.comprovanteResidenciaSelecionada = event.target.files[0] || null;
  }

  getCertidaoNegativaMunicipalSelecionada (event: any): void {
    this.certidaoNegativaMunicipalSelecionada = event.target.files[0] || null;
  }

  getCertidaoNegativaCriminalSelecionada (event: any): void {
    this.certidaoNegativaCriminalSelecionada = event.target.files[0] || null;
  }

  getCertificadoPropriedadeSelecionada(event: any): void {
    this.certificadoPropriedadeSelecionada = event.target.files[0] || null;
  }

  getCertificadoCondutorSelecionado (event: any): void {
    this.certificadoCondutorSelecionado = event.target.files[0] || null;
  }

  getApoliceSeguroVidaSelecionada(event: any): void {
    this.apoliceSeguroVidaSelecionada = event.target.files[0] || null;
  }

  getApoliceSeguroMotocicletaSelecionada(event: any): void {
    this.apoliceSeguroMotocicletaSelecionada = event.target.files[0] || null;
  }

  getFotoSelecionada (event: any): void {
    this.fotoSelecionada = event.target.files[0] || null;
  }

  carregarStatus(status: string) {
    var strStatus = "";
    switch (status) {
      case "ATIVO":
        strStatus = "1";
        break;
      case "INATIVO":
        strStatus = "2";
        break;
      case "SUSPENSO":
        strStatus = "3";
        break;
      case "CASSADO":
        strStatus = "4";
        break;
    }

    return strStatus;
  }

  voltar(): void{
    if(environment.moduloSelecionado == 1){
      this.router.navigate(['/permissionario']);
    }else{
      this.router.navigate(['/autorizatariomoto']);
    }
  }
}
