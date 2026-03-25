import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {DefensorModelo} from "../defensor-modelo.model";
import {DefensorService} from "../../../service/defensor.service";
import {environment} from "../../../../environments/environment";
import {PermissionarioService} from "../../../service/permissionario.service";
import {DefensorFiltro} from "../defensor-filtro.model";
import {LoadingService} from "../../../service/loading.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-defensor-detalhe',
  templateUrl: './defensor-detalhe.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class DefensorDetalheComponent implements OnInit {

  public loading = false;

  localDataNascimento: string | null;
  localDataValidadeCnh: string | null;
  eventDataNascimento: any;
  eventDataValidadeCnh: any;

  defensorFiltro: DefensorFiltro = {
    idDefensor: 0,
    nomeDefensor: "",
    cpfDefensor: "",
    cnhDefensor: "",
    dataCriacao: "",
    nomePermissionario: "",
    cpfPermissionario: ""
  };

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
    cep: "",
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
    { id: '1', nome: 'A' },
    { id: '2', nome: 'AB' },
    { id: '3', nome: 'B' },
    { id: '4', nome: 'C' },
    { id: '5', nome: 'D' }
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

  permissionarioSelecionado = "";
  permissionariosOptions: any[] = [];

  constructor(private defensorService: DefensorService,
              private permissionarioService: PermissionarioService,
              private loadingService: LoadingService,
              private router: Router) {
    this.errors = '';
    this.id = '';
    this.nomeLogado = '';
    this.localDataNascimento = '';
    this.localDataValidadeCnh = '';
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
      this.defensor.estadoCivil = history.state.data.estadoCivil;
      this.defensor.dataNascimento = history.state.data.dataNascimento;
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
      this.statusSelecionado = this.carregarStatus(history.state.data.status);
      this.defensor.status = history.state.data.status;
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

  editarDefensor(): void{
    this.defensor.ufDefensor = this.ufSelecionada;
    this.defensor.categoriaCnhDefensor = this.categoriaCnhSelecionada;
    this.defensor.sexo = this.sexoSelecionado;
    this.defensor.estadoCivil = this.estadoCivilSelecionado;
    this.defensor.idPermissionario = Number(this.permissionarioSelecionado);
    this.defensor.status = this.statusSelecionado;

    if (this.localDataNascimento != null && (this.defensor.dataNascimento == '' || this.defensor.dataNascimento == null)) {
      this.defensor.dataNascimento = this.localDataNascimento;
    }
    if (this.localDataValidadeCnh != null && (this.defensor.dataValidadeCnh == '' || this.defensor.dataValidadeCnh == null)) {
      this.defensor.dataValidadeCnh = this.localDataValidadeCnh;
    }

    this.defensor.usuario = environment.usuarioLogado;

    if(this.validarCamposObrigatoriosDefensor() == false){
      return;
    }

    this.defensorService.editarDefensor(this.defensor, this.anexoRgSelecionado, this.anexoCpfSelecionado,
      this.anexoCnhSelecionada, this.comprovanteResidenciaSelecionada, this.certidaoNegativaMunicipalSelecionada,
      this.certidaoNegativaCriminalSelecionada, this.certificadoPropriedadeSelecionada, this.certificadoCondutorSelecionado,
      this.apoliceSeguroVidaSelecionada, this.apoliceSeguroMotocicletaSelecionada, this.fotoSelecionada, this.eventDataNascimento,
      this.eventDataValidadeCnh).subscribe({
      next: (response) => {
        this.defensorService.showMessageSuccess('Defensor Atualizado com Sucesso!!!');
        if(environment.moduloSelecionado == 1){
          this.router.navigate(['/defensor']);
        }else{
          this.router.navigate(['/defensormoto']);
        }
      },
      error: (error) => {
        this.defensorService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
  }

  validarCamposObrigatoriosDefensor(): boolean{
    if(this.defensor.idPermissionario == null || this.defensor.idPermissionario == 0){
      this.defensorService.showMessageError('O campo Autorizatário é obrigatório!');
      return false;
    }
    if(this.defensor.nomeDefensor == null || this.defensor.nomeDefensor == ''){
      this.defensorService.showMessageError('O campo Nome Defensor é obrigatório!');
      return false;
    }
    if(this.defensor.status == null || this.defensor.status == ''){
      this.permissionarioService.showMessageError('O campo Status é obrigatório!');
      return false;
    }
    if(this.defensor.cpfDefensor == null || this.defensor.cpfDefensor == ''){
      this.defensorService.showMessageError('O campo CPF é obrigatório!');
      return false;
    }
    if(this.defensor.rgDefensor == null || this.defensor.rgDefensor == ''){
      this.defensorService.showMessageError('O campo RG é obrigatório!');
      return false;
    }
    if(this.defensor.orgaoEmissor == null || this.defensor.orgaoEmissor == ''){
      this.defensorService.showMessageError('O campo Órgão Emissor é obrigatório!');
      return false;
    }
    if(this.defensor.filiacaoMae == null || this.defensor.filiacaoMae == ''){
      this.defensorService.showMessageError('O campo Filiação Mãe é obrigatório!');
      return false;
    }
    if(this.defensor.celularDefensor == null || this.defensor.celularDefensor == ''){
      this.defensorService.showMessageError('O campo Celular/Telefone é obrigatório!');
      return false;
    }
    if(this.defensor.ufDefensor == null || this.defensor.ufDefensor == ''){
      this.defensorService.showMessageError('O campo UF é obrigatório!');
      return false;
    }
    if(this.defensor.cidadeDefensor == null || this.defensor.cidadeDefensor == ''){
      this.defensorService.showMessageError('O campo Cidade é obrigatório!');
      return false;
    }
    if(this.defensor.bairroDefensor == null || this.defensor.bairroDefensor == ''){
      this.defensorService.showMessageError('O campo Bairro é obrigatório!');
      return false;
    }
    if(this.defensor.enderecoDefensor == null || this.defensor.enderecoDefensor == ''){
      this.defensorService.showMessageError('O campo Endereço é obrigatório!');
      return false;
    }
    if(this.defensor.cnhDefensor == null || this.defensor.cnhDefensor == ''){
      this.defensorService.showMessageError('O campo CNH é obrigatório!');
      return false;
    }
    if(this.defensor.dataValidadeCnh == null || this.defensor.dataValidadeCnh == ''){
      this.defensorService.showMessageError('O campo Data Validade CNH é obrigatório!');
      return false;
    }
    if(this.defensor.categoriaCnhDefensor == null || this.defensor.categoriaCnhDefensor == ''){
      this.defensorService.showMessageError('O campo Categoria CNH é obrigatório!');
      return false;
    }

    return true;
  }

  onChangeDataNascimento(event: MatDatepickerInputEvent<Date>) {
    if(event.value != null){
      this.eventDataNascimento = event.value;
    }
  }

  onChangeDataValidadeCnh(event: MatDatepickerInputEvent<Date>) {
    if(event.value != null){
      this.eventDataValidadeCnh = event.value;
    }
  }

  imprimirAnexo(idDefensor: number, aplicacao: string, anexo: string): void {
    this.defensorService.imprimirAnexo(idDefensor, aplicacao, anexo, environment.moduloSelecionado).subscribe({
      next: (defensores) => {
        if (defensores.byteLength == 0) {
          this.defensorService.showMessageAlert(
            "Não há dados para imprimir!"
          );
        }
        const blob = new Blob([defensores], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');

        this.loadingService.hide();
        this.defensorService.showMessageSuccess("Anexo carregado com sucesso!");
      },
      error: (error) => {
        this.loadingService.hide();
        this.defensorService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
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
      this.router.navigate(['/defensor']);
    }else{
      this.router.navigate(['/defensormoto']);
    }
  }

  formatarCep(){
    var value = this.defensor.cep;
    var cepPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
      .replace(/(\d{2})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
      .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona ponto após o sexto dígito
    this.defensor.cep = cepPattern;
  }

  formatarCpf(){
    var value = this.defensor.cpfDefensor;
    var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
      .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Adiciona traço após o nono
    this.defensor.cpfDefensor = cpfPattern;
  }

  formatarRg(){
    var value = this.defensor.rgDefensor;
    if(this.defensor.rgDefensor.length == 8){
      var rgPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
        .replace(/(\d{1})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
        .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono
      this.defensor.rgDefensor = rgPattern;
    }else{
      var rgPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
        .replace(/(\d{2})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
        .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono
      this.defensor.rgDefensor = rgPattern;
    }

  }

  formatarCelular() {
    let valor = this.defensor.celularDefensor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3');
    this.defensor.celularDefensor = valor;
  }

  formatarCnh(){
    var value = this.defensor.cnhDefensor;
    var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
    this.defensor.cnhDefensor = cpfPattern;
  }
}
