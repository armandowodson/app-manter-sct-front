import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DefensorService} from "../../../service/defensor.service";
import {DefensorModelo} from "../defensor-modelo.model";
import {environment} from "../../../../environments/environment";
import {PermissionarioService} from "../../../service/permissionario.service";
import {Observable} from "rxjs";
import {PageModelo} from "../../comum/page-modelo.model";
import {DefensorFiltro} from "../defensor-filtro.model";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-defensor-create',
  templateUrl: './defensor-create.component.html',
})

export class DefensorCreateComponent implements OnInit {

  public loading = false;

  localDataNascimento: string | null;
  localDataValidadeCnh: string | null;

  defensorFiltro: DefensorFiltro = {
    idDefensor: 0,
    nomeDefensor: "",
    cpfDefensor: "",
    cnhDefensor: "",
    dataCriacao: "",
    nomePermissionario: "",
    cpfPermissionario: ""
  };

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

  permissionarioSelecionado = "";
  permissionariosOptions: any[] = [];

  constructor(private defensorService: DefensorService,
              private permissionarioService: PermissionarioService,
              private router: Router) {
    this.errors = '';
    this.nomeLogado = '';
    this.localDataNascimento = '';
    this.localDataValidadeCnh = '';
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;

    this.permissionarioService.consultarPermissionariosDisponiveisDefensor().subscribe(
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
    if(this.defensor.cpfDefensor != ""){
      this.defensor.cpfDefensor = this.defensor.cpfDefensor;
    }else{
      this.defensorFiltro.cpfDefensor = "11111111111";
    }
    const request: Observable<PageModelo> = this.defensorService.consultarDefensoresComFiltros(
      this.defensorFiltro, 0, 10);
    request.subscribe({
      next: (res) => {
        if (res != null && res.totalElements > 0) {
          this.permissionarioService.showMessageAlert(
            "Já existe Defensor para o CPF: " + this.defensorFiltro.cpfDefensor + " informado!"
          );
          this.defensor.cpfDefensor = "";
        }else{
          this.formatarCpf();
        }
      },
      error: (error) => {
        this.loading = false;
        this.permissionarioService.showMessageError(error.message);
      }
    });
  }

  inserirDefensor(): void{
    this.defensor.ufDefensor = this.ufSelecionada;
    this.defensor.categoriaCnhDefensor = this.categoriaCnhSelecionada;
    this.defensor.sexo = this.sexoSelecionado;
    this.defensor.estadoCivil = this.estadoCivilSelecionado;
    this.defensor.idPermissionario = Number(this.permissionarioSelecionado);
    this.defensor.status = this.statusSelecionado;

    if (this.localDataNascimento != null && this.localDataNascimento != '') {
      this.defensor.dataNascimento = this.localDataNascimento;
    }
    if (this.localDataValidadeCnh != null && this.localDataValidadeCnh != '') {
      this.defensor.dataValidadeCnh = this.localDataValidadeCnh;
    }

    this.defensor.usuario = environment.usuarioLogado;

    if(this.validarCamposObrigatoriosDefensor() == false){
      return;
    }

    this.defensorService.inserirDefensor(this.defensor, this.anexoRgSelecionado, this.anexoCpfSelecionado,
      this.anexoCnhSelecionada, this.comprovanteResidenciaSelecionada, this.certidaoNegativaMunicipalSelecionada,
      this.certidaoNegativaCriminalSelecionada, this.certificadoPropriedadeSelecionada, this.certificadoCondutorSelecionado,
      this.apoliceSeguroVidaSelecionada, this.apoliceSeguroMotocicletaSelecionada, this.fotoSelecionada).subscribe({
      next: (response) => {
        this.defensorService.showMessageSuccess('Defensor Criado com Sucesso!!!');
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
    if(this.defensor.cpfDefensor == null || this.defensor.cpfDefensor == ''){
      this.defensorService.showMessageError('O campo CPF é obrigatório!');
      return false;
    }
    if(this.defensor.status == null || this.defensor.status == ''){
      this.permissionarioService.showMessageError('O campo Status é obrigatório!');
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
    if(this.defensor.categoriaCnhDefensor == null || this.defensor.categoriaCnhDefensor == ''){
      this.defensorService.showMessageError('O campo Categoria CNH é obrigatório!');
      return false;
    }
    if(this.anexoRgSelecionado == null){
      this.defensorService.showMessageError('O campo Anexo RG é obrigatório!');
      return false;
    }
    if(this.anexoCpfSelecionado == null){
      this.defensorService.showMessageError('O campo Anexo CPF é obrigatório!');
      return false;
    }
    if(this.anexoCnhSelecionada == null){
      this.defensorService.showMessageError('O campo Anexo CNH é obrigatório!');
      return false;
    }
    if(this.comprovanteResidenciaSelecionada == null){
      this.defensorService.showMessageError('O campo Comprovante de Residência é obrigatório!');
      return false;
    }
    if(this.certidaoNegativaMunicipalSelecionada == null){
      this.defensorService.showMessageError('O campo Certidão Negativa de Multas e Ocorrências  DETRAN-MA é obrigatório!');
      return false;
    }
    if(this.certidaoNegativaCriminalSelecionada == null){
      this.defensorService.showMessageError('O campo Certidão Negativa de Antecedentes Criminais é obrigatório!');
      return false;
    }
    if(this.certificadoPropriedadeSelecionada == null){
      this.defensorService.showMessageError('O campo Certificado de Propriedade da Motocicleta é obrigatório!');
      return false;
    }
    if(this.certificadoCondutorSelecionado == null){
      this.defensorService.showMessageError('O campo Certificado de Curso Específico (emitido máx. 2 anos) é obrigatório!');
      return false;
    }
    if(this.apoliceSeguroVidaSelecionada == null){
      this.defensorService.showMessageError('O campo Apólice de Seguro de Vida é obrigatório!');
      return false;
    }
    if(this.apoliceSeguroMotocicletaSelecionada == null){
      this.defensorService.showMessageError('O campo Apólice de Seguro da Motocicleta (acidentes, furto, incêndio...) é obrigatório!');
      return false;
    }
    if(this.fotoSelecionada == null){
      this.defensorService.showMessageError('O campo Foto 3x4 é obrigatório!');
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
