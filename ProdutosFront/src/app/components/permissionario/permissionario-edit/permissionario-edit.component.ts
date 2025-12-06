import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {PermissionarioModelo} from "../permissionario-modelo.model";
import {PermissionarioService} from "../../../service/permissionario.service";

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
    naturezaPessoa: "",
    cnhPermissionario: "",
    ufPermissionario: "",
    bairroPermissionario: "",
    enderecoPermissionario: "",
    celularPermissionario: "",
    certidaoNegativaCriminal: new Uint8Array(8),
    dataCriacao: ""
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

  certidaoNegativaCriminalSelecionada: File | null = null;
  certidaoNegativaMunicipalSelecionada: File | null = null;
  fotoSelecionada: File | null = null;

  errors: string;
  id: string;

  constructor(private permissionarioService: PermissionarioService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
    this.errors = '';
    this.id = '';
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.permissionario.idPermissionario = history.state.data.idPermissionario;
      this.permissionario.numeroPermissao = history.state.data.numeroPermissao;
      this.permissionario.nomePermissionario = history.state.data.nomePermissionario;
      this.permissionario.cpfPermissionario = history.state.data.cpfPermissionario;
      this.permissionario.cnpjEmpresa = history.state.data.cnpjEmpresa;
      this.permissionario.rgPermissionario = history.state.data.rgPermissionario;
      this.naturezaSelecionada = history.state.data.naturezaPessoa;
      this.permissionario.naturezaPessoa = history.state.data.naturezaPessoa;
      this.permissionario.cnhPermissionario = history.state.data.cnhPermissionario;
      this.ufSelecionada = history.state.data.ufPermissionario;
      this.permissionario.ufPermissionario = history.state.data.ufPermissionario;
      this.permissionario.bairroPermissionario = history.state.data.bairroPermissionario;
      this.permissionario.enderecoPermissionario = history.state.data.enderecoPermissionario;
      this.permissionario.celularPermissionario = history.state.data.celularPermissionario;
    }
  }

  consultarPermissionarioId(id: number){
    this.permissionario.idPermissionario = id;
    this.permissionarioService.consultarPermissionarioId(this.permissionario).subscribe(permi => {
        if (permi == null){
            this.permissionarioService.showMessageAlert('A consulta não retornou resultado!');
        }
        this.permissionario.idPermissionario = permi.idPermissionario;
        this.permissionario.numeroPermissao = permi.numeroPermissao;
        this.permissionario.nomePermissionario = permi.nomePermissionario;
        this.permissionario.cpfPermissionario = permi.cpfPermissionario;
        this.permissionario.cnpjEmpresa = permi.cnpjEmpresa;
        this.permissionario.rgPermissionario = permi.rgPermissionario;
        this.permissionario.naturezaPessoa = permi.naturezaPessoa;
        this.permissionario.cnhPermissionario = permi.cnhPermissionario;
        this.permissionario.ufPermissionario = permi.ufPermissionario;
        this.permissionario.bairroPermissionario = permi.bairroPermissionario;
        this.permissionario.enderecoPermissionario = permi.enderecoPermissionario;
        this.permissionario.celularPermissionario = permi.celularPermissionario;
      },
      error => {
        this.errors = error
        this.permissionarioService.showMessageError(this.errors);
    });
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
