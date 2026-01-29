import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import {VeiculoService} from "../../../service/veiculo.service";
import {VeiculoModelo} from "../veiculo-modelo.model";
import {environment} from "../../../../environments/environment";
import {PermissionarioService} from "../../../service/permissionario.service";
import {PermissionarioModelo} from "../../permissionario/permissionario-modelo.model";
import {PontoTaxiService} from "../../../service/ponto-taxi.service";

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
    idPontoTaxi: "",
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
    usuario: "",
    status: ""
  };

  corSelecionada = "";
  corOptions = [
    { id: 1, nome: 'BRANCA' },
    { id: 2, nome: 'PRATA' }
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

  permissionarioSelecionado = "";
  permissionariosOptions: any[] = [];

  pontoTaxiSelecionado = "";
  pontosTaxiOptions: any[] = [];

  crlvSelecionado: File | null = null;
  comprovanteVistoriaSelecionado: File | null = null;
  errors: string;
  nomeLogado: string;

  constructor(private veiculoService: VeiculoService,
              private permissionarioService: PermissionarioService,
              private pontoTaxiService: PontoTaxiService,
              private router: Router) {
    this.errors = '';
    this.nomeLogado = '';
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    this.permissionarioService.consultarPermissionariosDisponiveis().subscribe({
      next: (permissionarios) => {
        if (permissionarios == null || permissionarios.length == 0) {
          this.veiculoService.showMessageAlert(
            "Não há Permissionários disponíveis para seleção!"
          );
        }
        permissionarios?.forEach(element => {
          this.permissionariosOptions.push({ id: element.idPermissionario, nome: element.nomePermissionario });
        });
      },
      error: (error) => {
        this.veiculoService.showMessageError(error.message.replace("Error: ", ""));
      }
    });

    this.pontoTaxiService.consultarPontosTaxiDisponiveis().subscribe({
      next: (pontosTaxi) => {
        if (pontosTaxi == null || pontosTaxi.length == 0) {
          this.veiculoService.showMessageAlert(
            "Não há Pontos de Estacionamentos de Táxi disponíveis para seleção!"
          );
        }
        pontosTaxi?.forEach(element => {
          this.pontosTaxiOptions.push({ id: element.idPontoTaxi, nome: element.descricaoPonto });
        });
      },
      error: (error) => {
        this.veiculoService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
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
          this.veiculoService.showMessageError(error.message.replace("Error: ", ""));
        }
      });
  }

  inserirVeiculo(): void{
      this.veiculo.cor = this.corSelecionada;
      this.veiculo.combustivel = this.combustivelSelecionado;
      this.veiculo.situacaoVeiculo = this.situacaoVeiculoSelecionada;
      this.veiculo.tipoVeiculo = this.tipoVeiculoSelecionado;
      this.veiculo.idPermissionario = this.permissionarioSelecionado;
      this.veiculo.idPontoTaxi = this.pontoTaxiSelecionado;
      this.veiculo.usuario = environment.usuarioLogado;

      if(this.validarCamposObrigatoriosVeiculo() == false){
        return;
      }

      this.veiculoService.inserirVeiculo(this.veiculo, this.crlvSelecionado,
        this.comprovanteVistoriaSelecionado).subscribe({
        next: (response) => {
          this.veiculoService.showMessageSuccess('Veículo Criado com Sucesso!!!');
          this.router.navigate(['/veiculo']);
        },
        error: (error) => {
          this.veiculoService.showMessageError(error.message.replace("Error: ", ""));
        }
      });
  }

  validarCamposObrigatoriosVeiculo(): boolean{
    if(this.veiculo.idPermissionario == null || this.veiculo.idPermissionario == ''){
      this.veiculoService.showMessageError('O campo Permissionário é obrigatório!');
      return false;
    }

    if(this.veiculo.idPontoTaxi == null || this.veiculo.idPontoTaxi == ''){
      this.veiculoService.showMessageError('O campo Ponto de Estacionamento de Táxi é obrigatório!');
      return false;
    }

    if(this.veiculo.idPontoTaxi == null || this.veiculo.idPontoTaxi == ''){
      this.veiculoService.showMessageError('O campo Ponto de Estacionamento de Táxi é obrigatório!');
      return false;
    }

    if(this.veiculo.placa == null || this.veiculo.placa == ''){
      this.veiculoService.showMessageError('O campo Placa é obrigatório!');
      return false;
    }

    if(this.veiculo.tipoVeiculo == null || this.veiculo.tipoVeiculo == ''){
      this.veiculoService.showMessageError('O campo Tipo de Veículo é obrigatório!');
      return false;
    }

    if(this.veiculo.marca == null || this.veiculo.marca == ''){
      this.veiculoService.showMessageError('O campo Marca é obrigatório!');
      return false;
    }

    if(this.veiculo.modelo == null || this.veiculo.modelo == ''){
      this.veiculoService.showMessageError('O campo Modelo é obrigatório!');
      return false;
    }

    if(this.veiculo.anoModelo == null || this.veiculo.anoModelo == ''){
      this.veiculoService.showMessageError('O campo Ano Modelo é obrigatório!');
      return false;
    }

    if(this.veiculo.renavam == null || this.veiculo.renavam == ''){
      this.veiculoService.showMessageError('O campo Renavam é obrigatório!');
      return false;
    }

    if(this.veiculo.cor == null || this.veiculo.cor == ''){
      this.veiculoService.showMessageError('O campo Cor é obrigatório!');
      return false;
    }

    if(this.veiculo.combustivel == null || this.veiculo.combustivel == ''){
      this.veiculoService.showMessageError('O campo Combustível é obrigatório!');
      return false;
    }

    if(this.veiculo.chassi == null || this.veiculo.chassi == ''){
      this.veiculoService.showMessageError('O campo Chassi é obrigatório!');
      return false;
    }

    if(this.veiculo.anoFabricacao == null || this.veiculo.anoFabricacao == ''){
      this.veiculoService.showMessageError('O campo Ano Fabricação é obrigatório!');
      return false;
    }

    if(this.veiculo.situacaoVeiculo == null || this.veiculo.situacaoVeiculo == ''){
      this.veiculoService.showMessageError('O campo Situação do Veículo é obrigatório!');
      return false;
    }

    if(this.veiculo.numeroCrlv == null || this.veiculo.numeroCrlv == ''){
      this.veiculoService.showMessageError('O campo Nº do CRLV é obrigatório!');
      return false;
    }

    if(this.veiculo.anoCrlv == null || this.veiculo.anoCrlv == ''){
      this.veiculoService.showMessageError('O campo Ano do CRLV é obrigatório!');
      return false;
    }

    if(this.crlvSelecionado?.name == null || this.crlvSelecionado.name == ''){
      this.veiculoService.showMessageAlert('O anexo do CRLV é obrigatório!');
      return false;
    }

    if(this.comprovanteVistoriaSelecionado?.name == null || this.comprovanteVistoriaSelecionado.name == ''){
      this.veiculoService.showMessageAlert('O anexo do Comprovante de Vistoria é obrigatório!');
      return false;
    }

    return true;
  }

  voltar(): void{
    this.router.navigate(['/veiculo']);
  }

}
