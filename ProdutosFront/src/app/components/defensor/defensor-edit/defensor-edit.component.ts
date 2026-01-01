import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {DefensorModelo} from "../defensor-modelo.model";
import {DefensorService} from "../../../service/defensor.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-permissinario-edit',
  templateUrl: './defensor-edit.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class DefensorEditComponent implements OnInit {

  // @ts-ignore
  // @ts-ignore
  defensor: DefensorModelo = {
    idDefensor: 0,
    numeroPermissao: "",
    nomeDefensor: "",
    cpfDefensor: "",
    cnpjEmpresa: "",
    rgDefensor: "",
    orgaoEmissor: "",
    naturezaPessoa: "",
    ufDefensor: "",
    bairroDefensor: "",
    enderecoDefensor: "",
    celularDefensor: "",
    cnhDefensor: "",
    categoriaCnhDefensor: "",
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

  constructor(private defensorService: DefensorService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
    this.errors = '';
    this.id = '';
    this.nomeLogado = '';
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.defensor.idDefensor = history.state.data.idDefensor;
      this.defensor.numeroPermissao = history.state.data.numeroPermissao;
      this.defensor.nomeDefensor = history.state.data.nomeDefensor;
      this.defensor.cpfDefensor = history.state.data.cpfDefensor;
      this.defensor.cnpjEmpresa = history.state.data.cnpjEmpresa;
      this.defensor.rgDefensor = history.state.data.rgDefensor;
      this.defensor.orgaoEmissor = history.state.data.orgaoEmissor;
      this.naturezaSelecionada = history.state.data.naturezaPessoa;
      this.defensor.naturezaPessoa = history.state.data.naturezaPessoa;
      this.defensor.cnhDefensor = history.state.data.cnhDefensor;
      this.categoriaCnhSelecionada = history.state.data.categoriaCnhDefensor;
      this.defensor.categoriaCnhDefensor = history.state.data.categoriaCnhDefensor;
      this.ufSelecionada = history.state.data.ufDefensor;
      this.defensor.ufDefensor = history.state.data.ufDefensor;
      this.defensor.bairroDefensor = history.state.data.bairroDefensor;
      this.defensor.enderecoDefensor = history.state.data.enderecoDefensor;
      this.defensor.celularDefensor = history.state.data.celularDefensor;
      this.defensor.numeroQuitacaoMilitar = history.state.data.numeroQuitacaoMilitar;
      this.defensor.numeroQuitacaoEleitoral = history.state.data.numeroQuitacaoEleitoral;
      this.defensor.numeroInscricaoInss = history.state.data.numeroInscricaoInss;
      this.defensor.numeroCertificadoCondutor = history.state.data.numeroCertificadoCondutor;
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

  editarDefensor(): void{
    this.defensor.naturezaPessoa = this.naturezaSelecionada;
    this.defensor.ufDefensor = this.ufSelecionada;
    this.defensor.categoriaCnhDefensor = this.categoriaCnhSelecionada;
    this.defensor.usuario = environment.usuarioLogado;
    this.defensorService.editarDefensor(this.defensor, this.certidaoNegativaCriminalSelecionada,
      this.certidaoNegativaMunicipalSelecionada, this.fotoSelecionada).subscribe(() => {
        this.defensorService.showMessageSuccess('Defensor Atualizado com Sucesso!!!');
        this.router.navigate(['/defensor']);
      },
      error => {
        this.errors = error
        this.defensorService.showMessageError('Ocorreu um erro ao Atualizar o Defensor!!!');
      });
  }

  voltar(): void{
    this.router.navigate(['/defensor']);
  }
}
