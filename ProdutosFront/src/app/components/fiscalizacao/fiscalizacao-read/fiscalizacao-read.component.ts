import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import {FiscalizacaoModelo} from "../fiscalizacao.model";
import { FiscalizacaoService } from "../../../service/fiscalizacao.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FiscalizacaoModalComponent } from "../../fiscalizacao-modal-component/fiscalizacao-modal.component";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {PageModelo} from "../../comum/page-modelo.model";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-fiscalizacao-read",
  templateUrl: "./fiscalizacao-read.component.html"
})
export class FiscalizacaoReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public loading = false;

  fiscalizacaoFiltro: FiscalizacaoModelo = {
    idFiscalizacao: 0,
    dataFiscalizacao: "",
    dataFiscalizacaoOriginal: "",
    idVeiculo: 0,
    placa: "",
    marca: "",
    modelo: "",
    cor: "",
    idPermissionario: 0,
    numeroPermissao: "",
    nomePermissionario: "",
    cnhPermissionario: "",
    motivoInfracao: "",
    tipoInfracao: "",
    grupoMultas: "",
    prazoRegularizacao: "",
    prazoRegularizacaoOriginal: "",
    naturezaInfracao: "",
    modalidade: "",
    penalidade: "",
    observacao: "",
    dataCriacao: "",
    usuario: "",
    status: ""
  };

  fiscalizacoes: any[] = [];

  motivoInfracaoSelecionado = "";
  motivoInfracaoOptions = [
    { id: '1', nome: 'VEÍCULO IRREGULAR' },
    { id: '2', nome: 'VEÍCULO CLANDESTINO' },
    { id: '3', nome: 'VEÍCULO SEM TAXÍMETRO' }
  ];

  penalidadeInfracaoSelecionada = "";
  penalidadeInfracaoOptions = [
    { id: '1', nome: 'ADVERTÊNCIA' },
    { id: '2', nome: 'MULTA' },
    { id: '3', nome: 'SUSPENSÃO' },
    { id: '4', nome: 'CASSAÇÃO' }
  ];

  errors: string;
  nomeLogado: string;
  placaFiscalizacao: string;
  proprietarioFiscalizacao: string;
  totalFiscalizacoes: number;
  pageIndex: number;
  pageSize: number;
  buscouTodos: number;

  constructor(
    private fiscalizacaoService: FiscalizacaoService,
    private router: Router,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.nomeLogado = "";
    this.placaFiscalizacao = "";
    this.proprietarioFiscalizacao = "";
    this.totalFiscalizacoes = 0;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.buscouTodos = 0;
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    this.buscarTodosPontos();
  }

  buscarTodosPontos(){
      this.loading = true;
      this.buscouTodos = 1;
      const request: Observable<PageModelo> = this.fiscalizacaoService.consultarTodasFiscalizacoes(this.pageIndex, this.pageSize);
      request.subscribe({
        next: (res) => {
          if (res == null || res.totalElements == 0) {
            this.fiscalizacaoService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }

          this.fiscalizacoes = (res.content || []).map((item: any) => ({
            idFiscalizacao: item.idFiscalizacao,
            dataFiscalizacao: item.dataFiscalizacao,
            dataFiscalizacaoOriginal: this.formatarDataFiscalizacao(item.dataFiscalizacaoOriginal),
            idVeiculo: item.idVeiculo,
            placa: item.placa,
            marca: item.marca,
            modelo: item.modelo,
            cor: item.cor,
            idPermissionario: item.idPermissionario,
            numeroPermissao: item.numeroPermissao,
            nomePermissionario: item.nomePermissionario,
            cnhPermissionario: item.cnhPermissionario,
            motivoInfracao: item.motivoInfracao,
            tipoInfracao: item.tipoInfracao,
            grupoMultas: item.grupoMultas,
            prazoRegularizacao: item.prazoRegularizacao,
            prazoRegularizacaoOriginal: this.formatarDataFiscalizacao(item.prazoRegularizacaoOriginal),
            naturezaInfracao: item.naturezaInfracao,
            modalidade: item.modalidade,
            penalidade: item.penalidade,
            observacao: item.observacao,
            dataCriacao: item.dataCriacao,
            usuario: item.usuario,
            status: item.status
          }));
          this.totalFiscalizacoes = res.totalElements;
          this.pageIndex = res.number;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.fiscalizacaoService.showMessageError(error.message);
        }
      });
  }

  onPageChange(event: PageEvent): void {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      if((this.fiscalizacaoFiltro.placa != null && this.fiscalizacaoFiltro.placa != undefined && this.fiscalizacaoFiltro.placa != '') ||
        (this.fiscalizacaoFiltro.nomePermissionario != null && this.fiscalizacaoFiltro.nomePermissionario != undefined && this.fiscalizacaoFiltro.nomePermissionario != '') ||
        (this.fiscalizacaoFiltro.dataFiscalizacao != null && this.fiscalizacaoFiltro.dataFiscalizacao != undefined && this.fiscalizacaoFiltro.dataFiscalizacao != '') ||
        (this.fiscalizacaoFiltro.motivoInfracao != null && this.fiscalizacaoFiltro.motivoInfracao != undefined && this.fiscalizacaoFiltro.motivoInfracao != '') ||
        (this.fiscalizacaoFiltro.penalidade != null && this.fiscalizacaoFiltro.penalidade != undefined && this.fiscalizacaoFiltro.penalidade != '')){
        if(this.buscouTodos)
          this.pageIndex = 0;
        this.consultarFiscalizacoesComFiltros();
        this.buscouTodos = 0;
      }else{
        this.buscarTodosPontos();
      }
  }

  voltarPaginaPrincipal(): void {
    this.router.navigate(["/principal"]);
  }

  navegarInserirFiscalizacao(): void {
    this.router.navigate(["fiscalizacao/create"]);
  }

  navegarEditarFiscalizacao(fiscalizacaoSelecionado: FiscalizacaoModelo): void {
    this.router.navigate(['fiscalizacao/edit'], { state: {data: fiscalizacaoSelecionado} });
  }

  consultarFiscalizacoesComFiltros() {
      this.loading = true;

    this.fiscalizacaoFiltro.motivoInfracao = this.motivoInfracaoSelecionado;
    this.fiscalizacaoFiltro.penalidade = this.penalidadeInfracaoSelecionada;

      const request: Observable<PageModelo> = this.fiscalizacaoService.consultarFiscalizacoesComFiltros(this.fiscalizacaoFiltro, this.pageIndex, this.pageSize);
      request.subscribe({
        next: (res) => {
          this.fiscalizacoes = (res.content || []).map((item: any) => ({
            idFiscalizacao: item.idFiscalizacao,
            dataFiscalizacao: item.dataFiscalizacao,
            dataFiscalizacaoOriginal: this.formatarDataFiscalizacao(item.dataFiscalizacaoOriginal),
            idVeiculo: item.idVeiculo,
            placa: item.placa,
            marca: item.marca,
            modelo: item.modelo,
            cor: item.cor,
            idPermissionario: item.idPermissionario,
            numeroPermissao: item.numeroPermissao,
            nomePermissionario: item.nomePermissionario,
            cnhPermissionario: item.cnhPermissionario,
            motivoInfracao: item.motivoInfracao,
            tipoInfracao: item.tipoInfracao,
            grupoMultas: item.grupoMultas,
            prazoRegularizacao: item.prazoRegularizacao,
            prazoRegularizacaoOriginal: this.formatarDataFiscalizacao(item.prazoRegularizacaoOriginal),
            naturezaInfracao: item.naturezaInfracao,
            modalidade: item.modalidade,
            penalidade: item.penalidade,
            observacao: item.observacao,
            dataCriacao: item.dataCriacao,
            usuario: item.usuario,
            status: item.status
          }));
          if (res == null || res.totalElements == 0) {
            this.fiscalizacaoService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }
          this.totalFiscalizacoes = res.totalElements;
          this.pageIndex = res.number;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.fiscalizacaoService.showMessageError(error.message);
        }
      });
  }

  openModal(idFiscalizacao: number, placaFiscalizacao: string, nomePermissionario: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir Fiscalização: " + idFiscalizacao + " - Placa: " + placaFiscalizacao + " - Proprietário: " + nomePermissionario + " ?";
    dialogConfig.panelClass = "dialogModal";
    environment.idSelecionado = idFiscalizacao;
    this.matDialog.open(FiscalizacaoModalComponent, dialogConfig);
  }

  formatarDataFiscalizacao(dataFiscalizacao: string){
    let ano = dataFiscalizacao.substring(0, 4);
    let mes = dataFiscalizacao.substring(5, 7);
    let dia = dataFiscalizacao.substring(8, 10);
    return dia + '/' + mes + '/' + ano;
  }
}
