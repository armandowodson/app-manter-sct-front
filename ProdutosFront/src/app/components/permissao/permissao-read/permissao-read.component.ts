import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import {PermissaoModelo} from "../permissao.model";
import { PermissaoService } from "../../../service/permissao.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PermissaoModalComponent } from "../../permissao-modal-component/permissao-modal.component";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {PageModelo} from "../../comum/page-modelo.model";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-permissao-read",
  templateUrl: "./permissao-read.component.html"
})
export class PermissaoReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public loading = false;

  permissaoFiltro: PermissaoModelo = {
    idPermissao: 0,
    numeroPermissao: "",
    numeroAlvara: "",
    anoAlvara: "",
    categoriaPermissao: "",
    statusPermissao: "",
    periodoInicialStatus: "",
    periodoFinalStatus: "",
    dataValidadePermissao: "",
    penalidade: "",
    dataValidadePenalidade: "",
    dataValidadePermissaoOriginal: "",
    dataCriacao: "",
    usuario: ""
  };

  statusPermissaoSelecionada = "";
  statusPermissaoOptions = [
    { id: '1', nome: 'SUSPENSA' },
    { id: '2', nome: 'RENUNCIADA' },
    { id: '3', nome: 'RESERVADA' },
    { id: '4', nome: 'SUBSTITUÍDA' },
    { id: '5', nome: 'REVOGADA' },
    { id: '6', nome: 'EXPIRADA' },
    { id: '7', nome: 'ABANDONADA' }
  ];

  permissoes: any[] = [];

  errors: string;
  nomeLogado: string;
  totalPontos: number;
  pageIndex: number;
  pageSize: number;
  buscouTodos: number;

  constructor(
    private permissaoService: PermissaoService,
    private router: Router,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.nomeLogado = "";
    this.totalPontos = 0;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.buscouTodos = 0;
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    this.buscarTodasPermissoes();
  }

  buscarTodasPermissoes(){
      this.buscouTodos = 1;
      const request: Observable<PageModelo> = this.permissaoService.consultarTodasPermissoes(this.pageIndex, this.pageSize);
      request.subscribe({
        next: (res) => {
          this.permissoes = (res.content || []).map((item: any) => ({
            idPermissao: item.idPermissao,
            numeroPermissao: item.numeroPermissao,
            numeroAlvara: item.numeroAlvara,
            anoAlvara: item.anoAlvara,
            categoriaPermissao: this.carregarCategoriaPermissao(item.categoriaPermissao),
            statusPermissao: this.carregarStatusPermissao(item.statusPermissao),
            periodoInicialStatus: item.periodoInicialStatus,
            periodoFinalStatus: item.periodoFinalStatus,
            dataValidadePermissao: item.dataValidadePermissao,
            dataValidadePermissaoOriginal: this.formatarDataValidadePermissao(item.dataValidadePermissaoOriginal),
            penalidade: this.carregarPenalidadePermissao(item.penalidade),
            dataValidadePenalidade: item.dataValidadePenalidade,
            usuario: item.usuario
          }));
          this.totalPontos = res.totalElements;
          this.pageIndex = res.number;
          this.loading = false;
        },
        error: (err) => {
          this.errors = err.message;
          this.loading = false;
          this.permissaoService.showMessageError(this.errors);
        }
      });
  }

  onPageChange(event: PageEvent): void {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      if((this.permissaoFiltro.numeroPermissao != null && this.permissaoFiltro.numeroPermissao != undefined && this.permissaoFiltro.numeroPermissao != '') ||
        (this.permissaoFiltro.numeroAlvara != null && this.permissaoFiltro.numeroAlvara != undefined && this.permissaoFiltro.numeroAlvara != '') ||
        (this.permissaoFiltro.anoAlvara != null && this.permissaoFiltro.anoAlvara != undefined && this.permissaoFiltro.anoAlvara != '') ||
        (this.permissaoFiltro.statusPermissao != null && this.permissaoFiltro.statusPermissao != undefined && this.permissaoFiltro.statusPermissao != '') ||
        (this.permissaoFiltro.periodoInicialStatus != null && this.permissaoFiltro.periodoInicialStatus != undefined && this.permissaoFiltro.periodoInicialStatus != '') ||
        (this.permissaoFiltro.periodoFinalStatus != null && this.permissaoFiltro.periodoFinalStatus != undefined && this.permissaoFiltro.periodoFinalStatus != '')){
        if(this.buscouTodos)
          this.pageIndex = 0;
        this.consultarPermissaoComFiltros();
        this.buscouTodos = 0;
      }else{
        this.buscarTodasPermissoes();
      }
  }

  voltarPaginaPrincipal(): void {
    this.router.navigate(["/principal"]);
  }

  navegarInserirPermissao(): void {
    this.router.navigate(["permissao/create"]);
  }

  navegarEditarPermissao(permissaoSelecionado: PermissaoModelo): void {
    this.router.navigate(['permissao/edit'], { state: {data: permissaoSelecionado} });
  }

  consultarPermissaoComFiltros() {
      this.loading = true;
      this.permissaoFiltro.statusPermissao = this.statusPermissaoSelecionada;

      const request: Observable<PageModelo> = this.permissaoService.consultarPermissaoComFiltros(this.permissaoFiltro, this.pageIndex, this.pageSize);
      request.subscribe({
        next: (res) => {
          this.permissoes = (res.content || []).map((item: any) => ({
            idPermissao: item.idPermissao,
            numeroPermissao: item.numeroPermissao,
            numeroAlvara: item.numeroAlvara,
            anoAlvara: item.anoAlvara,
            categoriaPermissao: this.carregarCategoriaPermissao(item.categoriaPermissao),
            statusPermissao: this.carregarStatusPermissao(item.statusPermissao),
            periodoInicialStatus: item.periodoInicialStatus,
            periodoFinalStatus: item.periodoFinalStatus,
            dataValidadePermissao: item.dataValidadePermissao,
            dataValidadePermissaoOriginal: this.formatarDataValidadePermissao(item.dataValidadePermissaoOriginal),
            penalidade: this.carregarPenalidadePermissao(item.penalidade),
            dataValidadePenalidade: item.dataValidadePenalidade,
            usuario: item.usuario
          }));
          if (res.totalElements == 0) {
            this.permissaoService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }
          this.totalPontos = res.totalElements;
          this.pageIndex = res.number;
          this.loading = false;
        },
        error: (err) => {
          this.errors = err.message;
          this.loading = false;
          this.permissaoService.showMessageError(this.errors);
        }
      });
  }
  openModal(idPermissao: number, numeroPermissao: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir a Permissão: " + idPermissao + " - Nº " + numeroPermissao + " ?";
    dialogConfig.panelClass = "dialogModal";
    const modalDialog = this.matDialog.open(PermissaoModalComponent, dialogConfig);
  }

  carregarCategoriaPermissao(categoria: string) {
    var strCategoria = "";
    switch (categoria) {
      case "1":
        strCategoria = "DELEGAÇÃO";
        break;
      case "2":
        strCategoria = "TÍTULO PRECÁRIO";
        break;
      case "3":
        strCategoria = "LICITAÇÃO";
        break;
      case "4":
        strCategoria = "PRESTAÇÃO DO SERVIÇO PÚBLICO DE TRANSPORTE DE PASSAGEIROS";
        break;
    }

    return strCategoria;
  }

  carregarStatusPermissao(status: string) {
    var strStatus = "";
    switch (status) {
      case "1":
        strStatus = "ATIVA";
        break;
      case "2":
        strStatus = "SUSPENSA";
        break;
      case "3":
        strStatus = "RENUNCIADA";
        break;
      case "4":
        strStatus = "RESERVADA";
        break;
      case "5":
        strStatus = "SUBSTITUÍDA";
        break;
      case "6":
        strStatus = "REVOGADA";
        break;
      case "7":
        strStatus = "EXPIRADA";
        break;
      case "8":
        strStatus = "ABANDONADA";
        break;
    }

    return strStatus;
  }

  carregarPenalidadePermissao(penalidade: string) {
    var strPenalidade = "";
    switch (penalidade) {
      case "1":
        strPenalidade = "MULTA";
        break;
      case "2":
        strPenalidade = "SUSPENSÃO";
        break;
      case "3":
        strPenalidade = "CASSAÇÃO DO REGISTRO DE CONDUTOR";
        break;
    }

    return strPenalidade;
  }

  formatarDataValidadePermissao(dataValidadePermissao: string){
      let ano = dataValidadePermissao.substring(0, 4);
      let mes = dataValidadePermissao.substring(5, 7);
      let dia = dataValidadePermissao.substring(8, 10);
      return dia + '/' + mes + '/' + ano;
  }

}
