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
    naturezaPessoa: "",
    ufDefensor: "",
    cidadeDefensor: "",
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
    usuario: "",
    status: ""
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
    this.defensor.naturezaPessoa = this.naturezaSelecionada;
    this.defensor.ufDefensor = this.ufSelecionada;
    this.defensor.categoriaCnhDefensor = this.categoriaCnhSelecionada;
    this.defensor.numeroPermissao = this.permissaoSelecionada;

    this.defensor.usuario = environment.usuarioLogado;

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

  voltar(): void{
    this.router.navigate(['/defensor']);
  }

}
