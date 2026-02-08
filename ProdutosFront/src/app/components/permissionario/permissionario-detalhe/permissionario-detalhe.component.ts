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
    ufPermissionario: "",
    cidadePermissionario: "",
    bairroPermissionario: "",
    enderecoPermissionario: "",
    celularPermissionario: "",
    emailPermissionario: "",
    cnhPermissionario: "",
    categoriaCnhPermissionario: "",
    numeroQuitacaoMilitar: "",
    numeroQuitacaoEleitoral: "",
    numeroInscricaoInss: "",
    numeroCertificadoCondutor: "",
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
    { id: '1', nome: 'B' },
    { id: '2', nome: 'C' },
    { id: '3', nome: 'D' },
    { id: '4', nome: 'E' }
  ];

  aplicativoAlternativoSelecionado = "";
  aplicativoAlternativoOptions = [
    { id: '1', nome: 'SIM' },
    { id: '2', nome: 'NÃO' }
  ];

  certificadoCondutorSelecionado: File | null = null;
  certidaoNegativaCriminalSelecionada: File | null = null;
  certidaoNegativaMunicipalSelecionada: File | null = null;
  fotoSelecionada: File | null = null;

  permissaoSelecionada = "";
  permissoesOptions: any[] = [];

  errors: string;
  id: string;
  nomeLogado: string;

  constructor(private permissionarioService: PermissionarioService,
              private router: Router,
              private permissaoService: PermissaoService) {
    this.errors = '';
    this.id = '';
    this.nomeLogado = '';
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.permissaoService.consultarPermissoesDisponiveisAlteracao(history.state.data.numeroPermissao).subscribe(
        (permissoes) => {
          if (permissoes == null || permissoes.length == 0) {
            this.permissaoService.showMessageAlert(
              "Não há Permissão disponível para seleção!"
            );
          }
          permissoes?.forEach(element => {
            this.permissoesOptions.push({ idPermissao: element.idPermissao, numeroPermissao: element.numeroPermissao });
          });
        },
        (error) => {
          this.errors = error;
          this.permissaoService.showMessageError(this.errors);
        }
      );

      this.permissionario.idPermissionario = history.state.data.idPermissionario;
      this.permissaoSelecionada = history.state.data.numeroPermissao;
      this.permissionario.numeroPermissao = history.state.data.numeroPermissao;
      this.permissionario.nomePermissionario = history.state.data.nomePermissionario;
      this.permissionario.cpfPermissionario = history.state.data.cpfPermissionario;
      this.permissionario.rgPermissionario = history.state.data.rgPermissionario;
      this.permissionario.orgaoEmissor = history.state.data.orgaoEmissor;
      this.permissionario.cnhPermissionario = history.state.data.cnhPermissionario;
      this.categoriaCnhSelecionada = history.state.data.categoriaCnhPermissionario;
      this.permissionario.categoriaCnhPermissionario = history.state.data.categoriaCnhPermissionario;
      this.ufSelecionada = history.state.data.ufPermissionario;
      this.permissionario.ufPermissionario = history.state.data.ufPermissionario;
      this.permissionario.cidadePermissionario = history.state.data.cidadePermissionario;
      this.permissionario.bairroPermissionario = history.state.data.bairroPermissionario;
      this.permissionario.enderecoPermissionario = history.state.data.enderecoPermissionario;
      this.permissionario.celularPermissionario = history.state.data.celularPermissionario;
      this.permissionario.emailPermissionario = history.state.data.emailPermissionario;
      this.permissionario.numeroQuitacaoMilitar = history.state.data.numeroQuitacaoMilitar;
      this.permissionario.numeroQuitacaoEleitoral = history.state.data.numeroQuitacaoEleitoral;
      this.permissionario.numeroInscricaoInss = history.state.data.numeroInscricaoInss;
      this.permissionario.numeroCertificadoCondutor = history.state.data.numeroCertificadoCondutor;
      this.aplicativoAlternativoSelecionado = history.state.data.aplicativoAlternativo;
      this.permissionario.aplicativoAlternativo = history.state.data.aplicativoAlternativo;
      this.permissionario.observacao = history.state.data.observacao;
      this.nomeLogado = environment.nomeLogado;
    }
  }

  getCertificadoCondutorSelecionado (event: any): void {
    this.certificadoCondutorSelecionado = event.target.files[0] || null;
  }

  getCertidaoNegativaCriminalSelecionada (event: any): void {
    this.certidaoNegativaCriminalSelecionada = event.target.files[0] || null;
  }

  getCertidaoNegativaMunicipalSelecionada (event: any): void {
    this.certidaoNegativaMunicipalSelecionada = event.target.files[0] || null;
  }

  getFotoSelecionada (event: any): void {
    this.fotoSelecionada = event.target.files[0] || null;
  }

  voltar(): void{
    this.router.navigate(['/permissionario']);
  }
}
