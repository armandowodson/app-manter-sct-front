import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {DefensorModelo} from "../defensor-modelo.model";
import {DefensorService} from "../../../service/defensor.service";
import {environment} from "../../../../environments/environment";
import {PermissaoService} from "../../../service/permissao.service";
import {PermissionarioService} from "../../../service/permissionario.service";

@Component({
  selector: 'app-defensor-detalhe',
  templateUrl: './defensor-detalhe.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class DefensorDetalheComponent implements OnInit {

  // @ts-ignore
  // @ts-ignore
  defensor: DefensorModelo = {
    idDefensor: 0,
    idPermissionario: 0,
    nomeDefensor: "",
    cpfDefensor: "",
    rgDefensor: "",
    orgaoEmissor: "",
    filiacaoMae: "",
    filiacaoPai: "",
    sexo: "",
    estadoCivil: "",
    dataNascimento: "",
    ufDefensor: "",
    cidadeDefensor: "",
    bairroDefensor: "",
    enderecoDefensor: "",
    celularDefensor: "",
    emailDefensor: "",
    cnhDefensor: "",
    categoriaCnhDefensor: "",
    dataValidadeCnh: "",
    numeroQuitacaoMilitar: "",
    numeroQuitacaoEleitoral: "",
    numeroInscricaoInss: "",
    numeroCertificadoCondutor: "",
    dataValidadeCertificadoCondutor: "",
    dataCriacao: "",
    usuario: "",
    status: ""
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

  certificadoCondutorSelecionado: File | null = null;
  certidaoNegativaCriminalSelecionada: File | null = null;
  certidaoNegativaMunicipalSelecionada: File | null = null;
  fotoSelecionada: File | null = null;

  errors: string;
  id: string;
  nomeLogado: string;

  permissionarioSelecionado = "";
  permissionariosOptions: any[] = [];

  constructor(private defensorService: DefensorService,
              private permissionarioService: PermissionarioService,
              private router: Router) {
    this.errors = '';
    this.id = '';
    this.nomeLogado = '';
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.permissionarioService.consultarPermissionariosDisponiveisAlteracao(history.state.data.idPermissionario).subscribe(
        (permissionarios) => {
          if (permissionarios == null || permissionarios.length == 0) {
            this.permissionarioService.showMessageAlert(
              "Não há Autorizatário disponível para seleção!"
            );
          }
          permissionarios?.forEach(element => {
            this.permissionariosOptions.push({ idPermissionario: element.idPermissionario, nomePermissionario: element.nomePermissionario });
          });
        },
        (error) => {
          this.errors = error;
          this.permissionarioService.showMessageError(this.errors);
        }
      );

      this.defensor.idDefensor = history.state.data.idDefensor;
      this.permissionarioSelecionado = history.state.data.idPermissionario;
      this.defensor.idPermissionario = history.state.data.idPermissionario;
      this.defensor.nomeDefensor = history.state.data.nomeDefensor;
      this.defensor.cpfDefensor = history.state.data.cpfDefensor;
      this.defensor.rgDefensor = history.state.data.rgDefensor;
      this.defensor.orgaoEmissor = history.state.data.orgaoEmissor;
      this.defensor.filiacaoMae = history.state.data.filiacaoMae;
      this.defensor.filiacaoPai = history.state.data.filiacaoPai;
      this.sexoSelecionado = history.state.data.sexo;
      this.defensor.sexo = history.state.data.sexo;
      this.estadoCivilSelecionado = history.state.data.estadoCivil;
      this.defensor.cnhDefensor = history.state.data.cnhDefensor;
      this.categoriaCnhSelecionada = history.state.data.categoriaCnhDefensor;
      this.defensor.categoriaCnhDefensor = history.state.data.categoriaCnhDefensor;
      this.defensor.dataValidadeCnh = history.state.data.dataValidadeCnh;
      this.ufSelecionada = history.state.data.ufDefensor;
      this.defensor.ufDefensor = history.state.data.ufDefensor;
      this.defensor.cidadeDefensor = history.state.data.cidadeDefensor;
      this.defensor.bairroDefensor = history.state.data.bairroDefensor;
      this.defensor.enderecoDefensor = history.state.data.enderecoDefensor;
      this.defensor.cep = history.state.data.cep;
      this.defensor.celularDefensor = history.state.data.celularDefensor;
      this.defensor.emailDefensor = history.state.data.emailDefensor;
      this.defensor.numeroQuitacaoMilitar = history.state.data.numeroQuitacaoMilitar;
      this.defensor.numeroQuitacaoEleitoral = history.state.data.numeroQuitacaoEleitoral;
      this.defensor.numeroInscricaoInss = history.state.data.numeroInscricaoInss;
      this.defensor.numeroCertificadoCondutor = history.state.data.numeroCertificadoCondutor;
      this.defensor.dataValidadeCertificadoCondutor = history.state.data.dataValidadeCertificadoCondutor;
      this.statusSelecionado = history.state.data.status;
      this.defensor.status = history.state.data.status;
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
    if(environment.moduloSelecionado == 1){
      this.router.navigate(['/defensor']);
    }else{
      this.router.navigate(['/defensormoto']);
    }
  }
}
