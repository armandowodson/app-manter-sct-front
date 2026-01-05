import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import {VeiculoService} from "../../../service/veiculo.service";
import {VeiculoModelo} from "../veiculo-modelo.model";
import {environment} from "../../../../environments/environment";
import {PermissionarioService} from "../../../service/permissionario.service";
import {PermissionarioModelo} from "../../permissionario/permissionario-modelo.model";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-veiculo-create',
  templateUrl: './veiculo-create.component.html',
})

export class VeiculoCreateComponent implements OnInit {
  veiculo: VeiculoModelo = {
    idVeiculo: 0,
    idPermissionario: "",
    numeroPermissao: "",
    placa: "",
    renavam: "",
    chassi: "",
    anoFabricacao: "",
    marca: "",
    modelo: "",
    anoModelo: "",
    cor: "",
    combustivel: "",
    numeroTaximetro: "",
    anoRenovacao: "",
    dataVistoria: "",
    dataRetorno: "",
    situacaoVeiculo: "",
    numeroCrlv: "",
    anoCrlv: "",
    certificadoAfericao: "",
    tipoVeiculo: "",
    observacao: "",
    dataCriacao: "",
    usuario: ""
  };

  corSelecionada = "";
  corOptions = [
    { id: 1, nome: 'BRANCO' },
    { id: 2, nome: 'PRATA' },
    { id: 3, nome: 'CINZA' }
  ];

  combustivelSelecionado = "";
  combustivelOptions = [
    { id: 1, nome: 'GASOLINA' },
    { id: 2, nome: 'ÁLCOOL/ETANOL' },
    { id: 3, nome: 'DIESEL' },
    { id: 4, nome: 'GÁS NATURAL' },
    { id: 5, nome: 'ELETRICIDADE' }
  ];

  situacaoVeiculoSelecionada = "";
  situacaoVeiculoOptions = [
    { id: 1, nome: 'CONSERVADO' },
    { id: 2, nome: 'EM BOM ESTADO' },
    { id: 3, nome: 'ARRANHADO' },
    { id: 4, nome: 'AMASSADO' },
    { id: 5, nome: 'PNEUS CARECAS' }
  ];

  tipoVeiculoSelecionado = "";
  tipoVeiculoOptions = [
    { id: '1', nome: 'CONVENCIONAL' },
    { id: '2', nome: 'EXECUTIVO' },
    { id: '3', nome: 'ESPECIAL' }
  ];

  permissionario: PermissionarioModelo = {
    idPermissionario: 0,
    numeroPermissao: "",
    nomePermissionario: "",
    cpfPermissionario: "",
    cnpjEmpresa: "",
    rgPermissionario: "",
    orgaoEmissor: "",
    naturezaPessoa: "",
    ufPermissionario: "",
    bairroPermissionario: "",
    enderecoPermissionario: "",
    celularPermissionario: "",
    cnhPermissionario: "",
    categoriaCnhPermissionario: "",
    numeroQuitacaoMilitar: "",
    numeroQuitacaoEleitoral: "",
    numeroInscricaoInss: "",
    numeroCertificadoCondutor: "",
    dataCriacao: "",
    usuario: ""
  };

  permissionarioSelecionado = "";
  permissionariosOptions: any[] = [];

  crlvSelecionado: File | null = null;
  comprovanteVistoriaSelecionado: File | null = null;
  errors: string;
  nomeLogado: string;

  constructor(private veiculoService: VeiculoService,
              private permissionarioService: PermissionarioService,
              private router: Router) {
    this.errors = '';
    this.nomeLogado = '';
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    this.permissionarioService.consultarPermissionariosDisponiveis().subscribe(
      (permissionarios) => {
        if (permissionarios.length == 0) {
          this.veiculoService.showMessageAlert(
            "Não há Permissionário disponível para seleção!"
          );
        }
        permissionarios?.forEach(element => {
          this.permissionariosOptions.push({ id: element.idPermissionario, nome: element.nomePermissionario });
        });
      },
      (error) => {
        this.errors = error;
        this.veiculoService.showMessageError(this.errors);
      }
    );
  }

  getCrlvSelecionado (event: any): void {
    this.crlvSelecionado = event.target.files[0] || null;
  }

  getComprovanteVistoriaSelecionado (event: any): void {
    this.comprovanteVistoriaSelecionado = event.target.files[0] || null;
  }

  carregarPermissao(permissionario: any){
      this.permissionarioService.consultarPermissionarioId(permissionario.value).subscribe({
        next: (response) => {
          if (response == null) {
            this.veiculoService.showMessageAlert(
              "Não foram encontradas Permissões disponíveis para o cadastro do Veículo!"
            );
          }
          this.veiculo.numeroPermissao = response.numeroPermissao;
        },
        error: (error) => {
          this.veiculoService.showMessageError(error.message);
        }
      });
  }

  inserirVeiculo(): void{
      this.veiculo.cor = this.corSelecionada;
      this.veiculo.combustivel = this.combustivelSelecionado;
      this.veiculo.situacaoVeiculo = this.situacaoVeiculoSelecionada;
      this.veiculo.tipoVeiculo = this.tipoVeiculoSelecionado;
      this.veiculo.idPermissionario = this.permissionarioSelecionado;
      this.veiculo.usuario = environment.usuarioLogado;

      if(this.crlvSelecionado?.name == null || this.crlvSelecionado.name == ''){
        this.veiculoService.showMessageAlert('O anexo do CRLV é obrigatório!');
        return;
      }

      if(this.comprovanteVistoriaSelecionado?.name == null || this.comprovanteVistoriaSelecionado.name == ''){
        this.veiculoService.showMessageAlert('O anexo do Comprovante de Vistoria é obrigatório!');
        return;
      }

      this.veiculoService.inserirVeiculo(this.veiculo, this.crlvSelecionado,
        this.comprovanteVistoriaSelecionado).subscribe({
        next: (response) => {
          this.veiculoService.showMessageSuccess('Veículo Criado com Sucesso!!!');
          this.router.navigate(['/veiculo']);
        },
        error: (error) => {
          this.veiculoService.showMessageError(error.message);
        }
      });
  }

  voltar(): void{
    this.router.navigate(['/veiculo']);
  }

}
