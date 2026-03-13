import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PermissionarioService} from "../../../service/permissionario.service";
import {PermissionarioModelo} from "../permissionario-modelo.model";
import {environment} from "../../../../environments/environment";
import {PermissaoService} from "../../../service/permissao.service";
import {Observable} from "rxjs";
import {PageModelo} from "../../comum/page-modelo.model";
import {PermissionarioFiltro} from "../permissionario-filtro.model";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-permissionario-create',
  templateUrl: './permissionario-create.component.html',
})

export class PermissionarioCreateComponent implements OnInit {
  public loading = false;

  localDataNascimento: string | null;
  localDataValidadeCnh: string | null;

  permissionarioFiltro: PermissionarioFiltro = {
    idPermissionario: 0,
    numeroPermissao: "",
    nomePermissionario: "",
    cpfPermissionario: "",
    cnhPermissionario: "",
    dataCriacao: ""
  };

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

  sexoSelecionado = "";
  sexoOptions = [
    { id: 1, nome: 'MASCULINO' },
    { id: 2, nome: 'FEMININO' }
  ];

  estadoCivilSelecionado = "";
  estadoCivilOptions = [
    { id: 1, nome: 'SOLTEIRO' },
    { id: 2, nome: 'CASADO' },
    { id: 3, nome: 'SEPARADO' },
    { id: 4, nome: 'DIVORCIADO' },
    { id: 5, nome: 'VIÚVO' }
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
  nomeLogado: string;

  constructor(private permissionarioService: PermissionarioService,
              private permissaoService: PermissaoService,
              private router: Router) {
    this.errors = '';
    this.nomeLogado = '';
    this.localDataNascimento = '';
    this.localDataValidadeCnh = '';
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    this.statusSelecionado = '1';
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

  verificarCpf(){
    if(this.permissionario.cpfPermissionario != ""){
        this.permissionarioFiltro.cpfPermissionario = this.permissionario.cpfPermissionario;
    }else{
      this.permissionarioFiltro.cpfPermissionario = "11111111111";
    }
    const request: Observable<PageModelo> = this.permissionarioService.consultarPermissionariosComFiltros(
      this.permissionarioFiltro, 0, 10);
    request.subscribe({
      next: (res) => {
        if (res != null && res.totalElements > 0) {
          this.permissionarioService.showMessageAlert(
            "Já existe Autorizatário para o CPF: " + this.permissionarioFiltro.cpfPermissionario + " informado!"
          );
          this.permissionario.cpfPermissionario = "";
        }
      },
      error: (error) => {
        this.loading = false;
        this.permissionarioService.showMessageError(error.message);
      }
    });
  }

  inserirPermissionario(): void{
    this.permissionario.ufPermissionario = this.ufSelecionada;
    this.permissionario.categoriaCnhPermissionario = this.categoriaCnhSelecionada;
    this.permissionario.aplicativoAlternativo = this.aplicativoAlternativoSelecionado;
    this.permissionario.sexo = this.sexoSelecionado;
    this.permissionario.estadoCivil = this.estadoCivilSelecionado;
    this.permissionario.status = this.statusSelecionado;

    if (this.localDataNascimento != null) {
      this.permissionario.dataNascimento = this.localDataNascimento;
    }
    if (this.localDataValidadeCnh != null) {
      this.permissionario.dataValidadeCnh = this.localDataValidadeCnh;
    }

    this.permissionario.usuario = environment.usuarioLogado;

    if(this.validarCamposObrigatoriosPermissionario() == false){
      return;
    }

    this.permissionarioService.inserirPermissionario(this.permissionario, this.anexoRgSelecionado, this.anexoCpfSelecionado,
      this.anexoCnhSelecionada, this.comprovanteResidenciaSelecionada, this.certidaoNegativaMunicipalSelecionada,
      this.certidaoNegativaCriminalSelecionada, this.certificadoPropriedadeSelecionada, this.certificadoCondutorSelecionado,
      this.apoliceSeguroVidaSelecionada, this.apoliceSeguroMotocicletaSelecionada, this.fotoSelecionada).subscribe({
      next: (response) => {
        this.permissionarioService.showMessageSuccess('Autorizatário Criado com Sucesso!!!');
        if(environment.moduloSelecionado == 1){
          this.router.navigate(['/permissionario']);
        }else{
          this.router.navigate(['/autorizatariomoto']);
        }
      },
      error: (error) => {
        this.permissionarioService.showMessageError(error.message);
      }
    });
  }

  validarCamposObrigatoriosPermissionario(): boolean{
    if(this.permissionario.nomePermissionario == null || this.permissionario.nomePermissionario == ''){
      this.permissionarioService.showMessageError('O campo Nome Autorizatário é obrigatório!');
      return false;
    }
    if(this.permissionario.cpfPermissionario == null || this.permissionario.cpfPermissionario == ''){
      this.permissionarioService.showMessageError('O campo CPF é obrigatório!');
      return false;
    }
    if(this.permissionario.status == null || this.permissionario.status == ''){
      this.permissionarioService.showMessageError('O campo Status é obrigatório!');
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
    if(this.permissionario.filiacaoMae == null || this.permissionario.filiacaoMae == ''){
      this.permissionarioService.showMessageError('O campo Filiação Mãe é obrigatório!');
      return false;
    }
    if(this.permissionario.sexo == null || this.permissionario.sexo == ''){
      this.permissionarioService.showMessageError('O campo Sexo é obrigatório!');
      return false;
    }
    if(this.permissionario.dataNascimento == null || this.permissionario.dataNascimento == ''){
      this.permissionarioService.showMessageError('O campo Data de Nascimento é obrigatório!');
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
    if(this.permissionario.cep == null || this.permissionario.cep == ''){
      this.permissionarioService.showMessageError('O campo CEP é obrigatório!');
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
    if(this.permissionario.dataValidadeCnh == null || this.permissionario.dataValidadeCnh == ''){
      this.permissionarioService.showMessageError('O campo Data Validade CNH é obrigatório!');
      return false;
    }
    if(this.permissionario.aplicativoAlternativo == null || this.permissionario.aplicativoAlternativo == ''){
      this.permissionarioService.showMessageError('O campo Aplicativo Alternativo é obrigatório!');
      return false;
    }
    if(this.anexoRgSelecionado == null){
      this.permissionarioService.showMessageError('O campo Anexo RG é obrigatório!');
      return false;
    }
    if(this.anexoCpfSelecionado == null){
      this.permissionarioService.showMessageError('O campo Anexo CPF é obrigatório!');
      return false;
    }
    if(this.anexoCnhSelecionada == null){
      this.permissionarioService.showMessageError('O campo Anexo CNH é obrigatório!');
      return false;
    }
    if(this.comprovanteResidenciaSelecionada == null){
      this.permissionarioService.showMessageError('O campo Comprovante de Residência é obrigatório!');
      return false;
    }
    if(this.certidaoNegativaMunicipalSelecionada == null){
      this.permissionarioService.showMessageError('O campo Certidão Negativa de Multas e Ocorrências  DETRAN-MA é obrigatório!');
      return false;
    }
    if(this.certidaoNegativaCriminalSelecionada == null){
      this.permissionarioService.showMessageError('O campo Certidão Negativa de Antecedentes Criminais é obrigatório!');
      return false;
    }
    if(this.certificadoPropriedadeSelecionada == null){
      this.permissionarioService.showMessageError('O campo Certificado de Propriedade da Motocicleta é obrigatório!');
      return false;
    }
    if(this.certificadoCondutorSelecionado == null){
      this.permissionarioService.showMessageError('O campo Certificado de Curso Específico (emitido máx. 2 anos) é obrigatório!');
      return false;
    }
    if(this.apoliceSeguroVidaSelecionada == null){
      this.permissionarioService.showMessageError('O campo Apólice de Seguro de Vida é obrigatório!');
      return false;
    }
    if(this.apoliceSeguroMotocicletaSelecionada == null){
      this.permissionarioService.showMessageError('O campo Apólice de Seguro da Motocicleta (acidentes, furto, incêndio...) é obrigatório!');
      return false;
    }
    if(this.fotoSelecionada == null){
      this.permissionarioService.showMessageError('O campo Foto 3x4 é obrigatório!');
      return false;
    }

    return true;
  }

  onChangeDataNascimento(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    this.localDataNascimento = selectedDate ? selectedDate.toLocaleDateString('en-CA') : null;
  }

  onChangeDataValidadeCnh(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    this.localDataValidadeCnh = selectedDate ? selectedDate.toLocaleDateString('en-CA') : null;
  }

  voltar(): void{
    if(environment.moduloSelecionado == 1){
      this.router.navigate(['/permissionario']);
    }else{
      this.router.navigate(['/autorizatariomoto']);
    }
  }

}
