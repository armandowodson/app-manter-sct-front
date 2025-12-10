import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import {PermissionarioService} from "../../../service/permissionario.service";
import {PermissionarioModelo} from "../permissionario-modelo.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-permissionario-create',
  templateUrl: './permissionario-create.component.html',
})

export class PermissionarioCreateComponent implements OnInit {

  NODE_TLS_REJECT_UNAUTHORIZED=0

  permissionario: PermissionarioModelo = {
    idPermissionario: 0,
    numeroPermissao: "",
    nomePermissionario: "",
    cpfPermissionario: "",
    cnpjEmpresa: "",
    rgPermissionario: "",
    naturezaPessoa: "",
    cnhPermissionario: "",
    ufPermissionario: "",
    bairroPermissionario: "",
    enderecoPermissionario: "",
    celularPermissionario: "",
    dataCriacao: "",
    usuario: ""
  };

  naturezaSelecionada = "";
  naturezaPessoaOptions = [
    { id: 1, nome: 'FÍSICA' },
    { id: 2, nome: 'JURÍDICA' }
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

  certidaoNegativaCriminalSelecionada: File | null = null;
  certidaoNegativaMunicipalSelecionada: File | null = null;
  fotoSelecionada: File | null = null;

  errors: string;

  constructor(private permissionarioService: PermissionarioService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
    this.errors = '';
  }

  ngOnInit(): void {

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

  inserirPermissionario(): void{
    this.permissionario.naturezaPessoa = this.naturezaSelecionada;
    this.permissionario.ufPermissionario = this.ufSelecionada;
    this.permissionario.usuario = environment.usuarioLogado;
    this.permissionarioService.inserirPermissionario(this.permissionario, this.certidaoNegativaCriminalSelecionada,
      this.certidaoNegativaMunicipalSelecionada, this.fotoSelecionada).subscribe(() => {
      this.permissionarioService.showMessageSuccess('Permissionário Criado com Sucesso!!!');
      this.router.navigate(['/permissionario']);
    },
    error => {
        this.errors = error
        this.permissionarioService.showMessageError('Ocorreu um erro ao Criar o Permissionário!!!');
    });
  }

  voltar(): void{
    this.router.navigate(['/permissionario']);
  }

}
