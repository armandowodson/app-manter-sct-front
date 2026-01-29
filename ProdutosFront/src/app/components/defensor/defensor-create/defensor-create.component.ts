import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DefensorService} from "../../../service/defensor.service";
import {DefensorModelo} from "../defensor-modelo.model";
import {environment} from "../../../../environments/environment";
import {PermissaoService} from "../../../service/permissao.service";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-defensor-create',
  templateUrl: './defensor-create.component.html',
})

export class DefensorCreateComponent implements OnInit {

  NODE_TLS_REJECT_UNAUTHORIZED=0

  defensor: DefensorModelo = {
    idDefensor: 0,
    numeroPermissao: "",
    nomeDefensor: "",
    cpfDefensor: "",
    rgDefensor: "",
    orgaoEmissor: "",
    ufDefensor: "",
    cidadeDefensor: "",
    bairroDefensor: "",
    enderecoDefensor: "",
    celularDefensor: "",
    emailDefensor: "",
    cnhDefensor: "",
    categoriaCnhDefensor: "",
    numeroQuitacaoMilitar: "",
    numeroQuitacaoEleitoral: "",
    numeroInscricaoInss: "",
    numeroCertificadoCondutor: "",
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
    { id: 1, nome: 'B' },
    { id: 2, nome: 'C' },
    { id: 3, nome: 'D' },
    { id: 4, nome: 'E' }
  ];

  certificadoCondutorSelecionado: File | null = null;
  certidaoNegativaCriminalSelecionada: File | null = null;
  certidaoNegativaMunicipalSelecionada: File | null = null;
  fotoSelecionada: File | null = null;

  errors: string;
  nomeLogado: string;

  permissaoSelecionada = "";
  permissoesOptions: any[] = [];

  constructor(private defensorService: DefensorService,
              private permissaoService: PermissaoService,
              private router: Router) {
    this.errors = '';
    this.nomeLogado = '';
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;

    this.permissaoService.consultarPermissoesDisponiveisDefensor().subscribe(
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

  inserirDefensor(): void{
    this.defensor.ufDefensor = this.ufSelecionada;
    this.defensor.categoriaCnhDefensor = this.categoriaCnhSelecionada;
    this.defensor.numeroPermissao = this.permissaoSelecionada;

    this.defensor.usuario = environment.usuarioLogado;

    if(this.validarCamposObrigatoriosDefensor() == false){
      return;
    }

    this.defensorService.inserirDefensor(this.defensor, this.certificadoCondutorSelecionado, this.certidaoNegativaCriminalSelecionada,
      this.certidaoNegativaMunicipalSelecionada, this.fotoSelecionada).subscribe({
      next: (response) => {
        this.defensorService.showMessageSuccess('Defensor Criado com Sucesso!!!');
        this.router.navigate(['/defensor']);
      },
      error: (error) => {
        this.defensorService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
  }

  validarCamposObrigatoriosDefensor(): boolean{
    if(this.defensor.numeroPermissao == null || this.defensor.numeroPermissao == ''){
      this.defensorService.showMessageError('O campo Nº da Permissão é obrigatório!');
      return false;
    }
    if(this.defensor.nomeDefensor == null || this.defensor.nomeDefensor == ''){
      this.defensorService.showMessageError('O campo Nome Permissionário é obrigatório!');
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

    return true;
  }

  voltar(): void{
    this.router.navigate(['/defensor']);
  }

}
