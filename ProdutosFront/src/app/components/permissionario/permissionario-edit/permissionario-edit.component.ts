import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {PermissionarioModelo} from "../permissionario-modelo.model";
import {PermissionarioService} from "../../../service/permissionario.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-permissinario-edit',
  templateUrl: './permissionario-edit.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class PermissionarioEditComponent implements OnInit {

  // @ts-ignore
  // @ts-ignore
  permissionario: PermissionarioModelo = {
    idPermissionario: 0,
    numeroPermissao: "",
    nomePermissionario: "",
    cpfPermissionario: "",
    cnpjEmpresa: "",
    rgPermissionario: "",
    orgaoEmissor: "",
    naturezaPessoa: "",
    ufPermissionario: "",
    bairroPermissionario: "",
    enderecoPermissionario: "",
    celularPermissionario: "",
    cnhPermissionario: "",
    categoriaCnhPermissionario: "",
    numeroQuitacaoMilitar: "",
    numeroQuitacaoEleitoral: "",
    numeroInscricaoInss: "",
    numeroCertificadoCondutor: "",
    dataCriacao: "",
    usuario: ""
  };

  naturezaSelecionada = "";
  naturezaPessoaOptions = [
    { id: 'FÍSICA', nome: 'FÍSICA' },
    { id: 'JURÍDICA', nome: 'JURÍDICA' }
  ];

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
    { id: 'B', nome: 'B' },
    { id: 'C', nome: 'C' },
    { id: 'D', nome: 'D' },
    { id: 'E', nome: 'E' }
  ];

  certidaoNegativaCriminalSelecionada: File | null = null;
  certidaoNegativaMunicipalSelecionada: File | null = null;
  fotoSelecionada: File | null = null;

  errors: string;
  id: string;
  nomeLogado: string;

  constructor(private permissionarioService: PermissionarioService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
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
      this.permissionario.cnpjEmpresa = history.state.data.cnpjEmpresa;
      this.permissionario.rgPermissionario = history.state.data.rgPermissionario;
      this.permissionario.orgaoEmissor = history.state.data.orgaoEmissor;
      this.naturezaSelecionada = history.state.data.naturezaPessoa;
      this.permissionario.naturezaPessoa = history.state.data.naturezaPessoa;
      this.permissionario.cnhPermissionario = history.state.data.cnhPermissionario;
      this.categoriaCnhSelecionada = history.state.data.categoriaCnhPermissionario;
      this.permissionario.categoriaCnhPermissionario = history.state.data.categoriaCnhPermissionario;
      this.ufSelecionada = history.state.data.ufPermissionario;
      this.permissionario.ufPermissionario = history.state.data.ufPermissionario;
      this.permissionario.bairroPermissionario = history.state.data.bairroPermissionario;
      this.permissionario.enderecoPermissionario = history.state.data.enderecoPermissionario;
      this.permissionario.celularPermissionario = history.state.data.celularPermissionario;
      this.permissionario.numeroQuitacaoMilitar = history.state.data.numeroQuitacaoMilitar;
      this.permissionario.numeroQuitacaoEleitoral = history.state.data.numeroQuitacaoEleitoral;
      this.permissionario.numeroInscricaoInss = history.state.data.numeroInscricaoInss;
      this.permissionario.numeroCertificadoCondutor = history.state.data.numeroCertificadoCondutor;
      this.nomeLogado = environment.nomeLogado;
    }
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

  editarPermissionario(): void{
    this.permissionario.naturezaPessoa = this.naturezaSelecionada;
    this.permissionario.ufPermissionario = this.ufSelecionada;
    this.permissionario.categoriaCnhPermissionario = this.categoriaCnhSelecionada;
    this.permissionario.usuario = environment.usuarioLogado;
    this.permissionarioService.editarPermissionario(this.permissionario, this.certidaoNegativaCriminalSelecionada,
      this.certidaoNegativaMunicipalSelecionada, this.fotoSelecionada).subscribe(() => {
        this.permissionarioService.showMessageSuccess('Permissionário Atualizado com Sucesso!!!');
        this.router.navigate(['/permissionario']);
      },
      error => {
        this.errors = error
        this.permissionarioService.showMessageError('Ocorreu um erro ao Atualizar o Permissionário!!!');
      });
  }

  voltar(): void{
    this.router.navigate(['/permissionario']);
  }
}
