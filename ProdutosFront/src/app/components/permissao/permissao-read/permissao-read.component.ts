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
import {LoadingService} from "../../../service/loading.service";

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
    anoPermissao: "",
    categoriaPermissao: 0,
    statusPermissao: 0,
    periodoInicialStatus: "",
    periodoFinalStatus: "",
    dataValidadePermissao: "",
    penalidade: 0,
    dataValidadePenalidade: "",
    dataValidadePermissaoOriginal: "",
    dataCriacao: "",
    usuario: "",
    autorizacaoTrafego: "",
    modalidade: 0,
    status: ""
  };

  statusPermissaoSelecionada = 0;
  statusPermissaoOptions = [
    { id: '1', nome: 'GERADA' },
    { id: '2', nome: 'EM USO' },
    { id: '3', nome: 'SUSPENSA' },
    { id: '4', nome: 'RENUNCIADA' },
    { id: '5', nome: 'RESERVADA' },
    { id: '6', nome: 'SUBSTITUÍDA' },
    { id: '7', nome: 'REVOGADA' },
    { id: '8', nome: 'EXPIRADA' },
    { id: '9', nome: 'ABANDONADA' }
  ];

  permissoes: any[] = [];
  categoriaPermissaoListagem: string;
  statusPermissaoListagem: string;

  errors: string;
  nomeLogado: string;
  totalPontos: number;
  pageIndex: number;
  pageSize: number;
  buscouTodos: number;

  constructor(
    private permissaoService: PermissaoService,
    private loadingService: LoadingService,
    private router: Router,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.nomeLogado = "";
    this.categoriaPermissaoListagem = "";
    this.statusPermissaoListagem = "";
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
            anoPermissao: item.anoPermissao,
            categoriaPermissao: item.categoriaPermissao,
            categoriaPermissaoListagem: this.carregarCategoriaPermissao(item.categoriaPermissao),
            statusPermissao: item.statusPermissao,
            statusPermissaoListagem: this.carregarStatusPermissao(item.statusPermissao),
            periodoInicialStatus: item.periodoInicialStatus,
            periodoFinalStatus: item.periodoFinalStatus,
            dataValidadePermissao: item.dataValidadePermissao,
            dataValidadePermissaoOriginal: this.formatarDataValidadePermissao(item.dataValidadePermissaoOriginal),
            penalidade: item.penalidade,
            dataValidadePenalidade: item.dataValidadePenalidade,
            autorizacaoTrafego: item.autorizacaoTrafego,
            modalidade: item.modalidade,
            usuario: item.usuario,
            status: item.status
          }));
          this.totalPontos = res.totalElements;
          this.pageIndex = res.number;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.permissaoService.showMessageError(err.message.replace("Error: ", ""));
        }
      });
  }

  onPageChange(event: PageEvent): void {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      if((this.permissaoFiltro.numeroPermissao != null && this.permissaoFiltro.numeroPermissao != undefined && this.permissaoFiltro.numeroPermissao != '') ||
        (this.permissaoFiltro.numeroAlvara != null && this.permissaoFiltro.numeroAlvara != undefined && this.permissaoFiltro.numeroAlvara != '') ||
        (this.permissaoFiltro.anoPermissao != null && this.permissaoFiltro.anoPermissao != undefined && this.permissaoFiltro.anoPermissao != '') ||
        (this.permissaoFiltro.statusPermissao != null && this.permissaoFiltro.statusPermissao != undefined && this.permissaoFiltro.statusPermissao != 0) ||
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

  navegarDetalharPermissao(permissaoSelecionado: PermissaoModelo): void {
    this.router.navigate(['permissao/detalhe'], { state: {data: permissaoSelecionado} });
  }

  gerarAutorizacaoTrafego(permissaoSelecionado: PermissaoModelo): void {
    this.permissaoService.gerarAutorizacaoTrafego(permissaoSelecionado).subscribe({
      next: (permissoes) => {
        if (permissoes.byteLength == 0) {
          this.permissaoService.showMessageAlert(
            "Não há dados para imprimir!"
          );
        }
        const blob = new Blob([permissoes], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');

        this.loadingService.hide();
        this.permissaoService.showMessageSuccess("Autorização de Tráfego gerada com sucesso!");
      },
      error: (error) => {
        this.loadingService.hide();
        this.permissaoService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
  }

  consultarPermissaoComFiltros() {
      this.loading = true;
      this.permissaoFiltro.statusPermissao = this.statusPermissaoSelecionada;

      const request: Observable<PageModelo> = this.permissaoService.consultarPermissaoComFiltros(this.permissaoFiltro, this.pageIndex, this.pageSize);
      request.subscribe({
        next: (res) => {
          if (res.totalElements == 0) {
            this.permissaoService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }

          this.permissoes = (res.content || []).map((item: any) => ({
            idPermissao: item.idPermissao,
            numeroPermissao: item.numeroPermissao,
            numeroAlvara: item.numeroAlvara,
            anoPermissao: item.anoPermissao,
            categoriaPermissao: item.categoriaPermissao,
            categoriaPermissaoListagem: this.carregarCategoriaPermissao(item.categoriaPermissao),
            statusPermissao: item.statusPermissao,
            statusPermissaoListagem: this.carregarStatusPermissao(item.statusPermissao),
            periodoInicialStatus: item.periodoInicialStatus,
            periodoFinalStatus: item.periodoFinalStatus,
            dataValidadePermissao: item.dataValidadePermissao,
            dataValidadePermissaoOriginal: this.formatarDataValidadePermissao(item.dataValidadePermissaoOriginal),
            penalidade: item.penalidade,
            dataValidadePenalidade: item.dataValidadePenalidade,
            autorizacaoTrafego: item.autorizacaoTrafego,
            modalidade: item.modalidade,
            usuario: item.usuario,
            status: item.status
          }));
          this.totalPontos = res.totalElements;
          this.pageIndex = res.number;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.permissaoService.showMessageError(err.message.replace("Error: ", ""));
        }
      });
  }

  openModal(idPermissao: number, numeroPermissao: string) {
    if(environment.usuarioLogado == null || environment.usuarioLogado == ''){
        this.permissaoService.showMessageAlert("Não é possível realizar a operação. Usuário não logado!");
        return;
    }
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir a Permissão Nº " + numeroPermissao + " ?";
    dialogConfig.panelClass = "dialogModal";
    environment.idSelecionado = idPermissao;
    this.matDialog.open(PermissaoModalComponent, dialogConfig);
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
        strStatus = "GERADA";
        break;
      case "2":
        strStatus = "EM USO";
        break;
      case "3":
        strStatus = "SUSPENSA";
        break;
      case "4":
        strStatus = "RENUNCIADA";
        break;
      case "5":
        strStatus = "RESERVADA";
        break;
      case "6":
        strStatus = "SUBSTITUÍDA";
        break;
      case "7":
        strStatus = "REVOGADA";
        break;
      case "8":
        strStatus = "EXPIRADA";
        break;
      case "9":
        strStatus = "ABANDONADA";
        break;
    }

    return strStatus;
  }

  formatarDataValidadePermissao(dataValidadePermissao: string){
      let ano = dataValidadePermissao.substring(0, 4);
      let mes = dataValidadePermissao.substring(5, 7);
      let dia = dataValidadePermissao.substring(8, 10);
      return dia + '/' + mes + '/' + ano;
  }

}
