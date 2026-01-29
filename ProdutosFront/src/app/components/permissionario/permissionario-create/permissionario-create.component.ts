import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PermissionarioService} from "../../../service/permissionario.service";
import {PermissionarioModelo} from "../permissionario-modelo.model";
import {environment} from "../../../../environments/environment";
import {PermissaoService} from "../../../service/permissao.service";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-permissionario-create',
  templateUrl: './permissionario-create.component.html',
})

export class PermissionarioCreateComponent implements OnInit {
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
    { id: 1, nome: 'B' },
    { id: 2, nome: 'C' },
    { id: 3, nome: 'D' },
    { id: 4, nome: 'E' }
  ];

  aplicativoAlternativoSelecionado = "";
  aplicativoAlternativoOptions = [
    { id: 1, nome: 'SIM' },
    { id: 2, nome: 'NÃO' }
  ];

  certificadoCondutorSelecionado: File | null = null;
  certidaoNegativaCriminalSelecionada: File | null = null;
  certidaoNegativaMunicipalSelecionada: File | null = null;
  fotoSelecionada: File | null = null;

  permissaoSelecionada = "";
  permissoesOptions: any[] = [];

  errors: string;
  nomeLogado: string;

  constructor(private permissionarioService: PermissionarioService,
              private permissaoService: PermissaoService,
              private router: Router) {
    this.errors = '';
    this.nomeLogado = '';
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;

    this.permissaoService.consultarPermissoesDisponiveis().subscribe(
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

  inserirPermissionario(): void{
    this.permissionario.ufPermissionario = this.ufSelecionada;
    this.permissionario.categoriaCnhPermissionario = this.categoriaCnhSelecionada;
    this.permissionario.numeroPermissao = this.permissaoSelecionada;
    this.permissionario.aplicativoAlternativo = this.aplicativoAlternativoSelecionado;

    this.permissionario.usuario = environment.usuarioLogado;

    if(this.validarCamposObrigatoriosPermissionario() == false){
      return;
    }

    this.permissionarioService.inserirPermissionario(this.permissionario, this.certificadoCondutorSelecionado, this.certidaoNegativaCriminalSelecionada,
      this.certidaoNegativaMunicipalSelecionada, this.fotoSelecionada).subscribe({
      next: (response) => {
        this.permissionarioService.showMessageSuccess('Permissionário Criado com Sucesso!!!');
        this.router.navigate(['/permissionario']);
      },
      error: (error) => {
        this.permissionarioService.showMessageError(error.message);
      }
    });
  }

  validarCamposObrigatoriosPermissionario(): boolean{
    if(this.permissionario.numeroPermissao == null || this.permissionario.numeroPermissao == ''){
      this.permissionarioService.showMessageError('O campo Nº da Permissão é obrigatório!');
      return false;
    }
    if(this.permissionario.nomePermissionario == null || this.permissionario.nomePermissionario == ''){
      this.permissionarioService.showMessageError('O campo Nome Permissionário é obrigatório!');
      return false;
    }
    if(this.permissionario.cpfPermissionario == null || this.permissionario.cpfPermissionario == ''){
      this.permissionarioService.showMessageError('O campo CPF é obrigatório!');
      return false;
    }
    if(this.permissionario.rgPermissionario == null || this.permissionario.rgPermissionario == ''){
      this.permissionarioService.showMessageError('O campo RG é obrigatório!');
      return false;
    }
    if(this.permissionario.orgaoEmissor == null || this.permissionario.orgaoEmissor == ''){
      this.permissionarioService.showMessageError('O campo Órgão Emissor é obrigatório!');
      return false;
    }
    if(this.permissionario.celularPermissionario == null || this.permissionario.celularPermissionario == ''){
      this.permissionarioService.showMessageError('O campo Celular/Telefone é obrigatório!');
      return false;
    }
    if(this.permissionario.ufPermissionario == null || this.permissionario.ufPermissionario == ''){
      this.permissionarioService.showMessageError('O campo UF é obrigatório!');
      return false;
    }
    if(this.permissionario.cidadePermissionario == null || this.permissionario.cidadePermissionario == ''){
      this.permissionarioService.showMessageError('O campo Cidade é obrigatório!');
      return false;
    }
    if(this.permissionario.bairroPermissionario == null || this.permissionario.bairroPermissionario == ''){
      this.permissionarioService.showMessageError('O campo Bairro é obrigatório!');
      return false;
    }
    if(this.permissionario.enderecoPermissionario == null || this.permissionario.enderecoPermissionario == ''){
      this.permissionarioService.showMessageError('O campo Endereço é obrigatório!');
      return false;
    }
    if(this.permissionario.cnhPermissionario == null || this.permissionario.cnhPermissionario == ''){
      this.permissionarioService.showMessageError('O campo CNH é obrigatório!');
      return false;
    }
    if(this.permissionario.categoriaCnhPermissionario == null || this.permissionario.categoriaCnhPermissionario == ''){
      this.permissionarioService.showMessageError('O campo Categoria CNH é obrigatório!');
      return false;
    }
    if(this.permissionario.aplicativoAlternativo == null || this.permissionario.aplicativoAlternativo == ''){
      this.permissionarioService.showMessageError('O campo Aplicativo Alternativo é obrigatório!');
      return false;
    }

    return true;
  }

  voltar(): void{
    this.router.navigate(['/permissionario']);
  }

}
