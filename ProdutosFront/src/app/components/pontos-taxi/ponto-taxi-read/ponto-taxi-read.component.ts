import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import {PontoTaxi} from "../ponto-taxi.model";
import { PontoTaxiService } from "../../../service/ponto-taxi.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PontoTaxiModalComponent } from "../../ponto-taxi-modal-component/ponto-taxi-modal.component";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {PageModelo} from "../../comum/page-modelo.model";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-ponto-taxi-read",
  templateUrl: "./ponto-taxi-read.component.html"
})
export class PontoTaxiReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  NODE_TLS_REJECT_UNAUTHORIZED = 0;
  public loading = false;

  pontoTaxiFiltro: PontoTaxi = {
    idPontoTaxi: 0,
    numeroPonto: "",
    descricaoPonto: "",
    fatorRotatividade: "",
    referenciaPonto: "",
    numeroVagas: "",
    modalidade: "",
    dataCriacao: "",
    usuario: ""
  };

  modalidadeSelecionada = "";
  modalidadeOptions = [
    { id: '1', nome: 'FIXO' },
    { id: '2', nome: 'ROTATIVO' },
    { id: '3', nome: 'FIX-ROTATIVO' }
  ];

  pontosTaxi: any[] = [];

  errors: string;
  descricaoPonto: string;
  nomeLogado: string;
  totalPontos: number;
  pageIndex: number;
  pageSize: number;
  buscouTodos: number;

  constructor(
    private pontoTaxiService: PontoTaxiService,
    private router: Router,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.descricaoPonto = "";
    this.nomeLogado = "";
    this.totalPontos = 0;
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
      const request: Observable<PageModelo> = this.pontoTaxiService.consultarTodosPontosTaxi(this.pageIndex, this.pageSize);
      request.subscribe({
        next: (res) => {
          if (res == null || res.totalElements == 0) {
            this.pontoTaxiService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }

          this.pontosTaxi = (res.content || []).map((item: any) => ({
            idPontoTaxi: item.idPontoTaxi,
            numeroPonto: item.numeroPonto,
            descricaoPonto: item.descricaoPonto,
            fatorRotatividade: item.fatorRotatividade,
            referenciaPonto: item.referenciaPonto,
            numeroVagas: item.numeroVagas,
            modalidade: item.modalidade,
            dataCriacao: item.dataCriacao,
            usuario: item.usuario
          }));
          this.totalPontos = res.totalElements;
          this.pageIndex = res.number;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.pontoTaxiService.showMessageError(error.message);
        }
      });
  }

  onPageChange(event: PageEvent): void {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      if((this.pontoTaxiFiltro.numeroPonto != null && this.pontoTaxiFiltro.numeroPonto != undefined && this.pontoTaxiFiltro.numeroPonto != '') ||
        (this.pontoTaxiFiltro.descricaoPonto != null && this.pontoTaxiFiltro.descricaoPonto != undefined && this.pontoTaxiFiltro.descricaoPonto != '') ||
        (this.pontoTaxiFiltro.fatorRotatividade != null && this.pontoTaxiFiltro.fatorRotatividade != undefined && this.pontoTaxiFiltro.fatorRotatividade != '') ||
        (this.pontoTaxiFiltro.numeroVagas != null && this.pontoTaxiFiltro.numeroVagas != undefined && this.pontoTaxiFiltro.numeroVagas != '') ||
        (this.pontoTaxiFiltro.referenciaPonto != null && this.pontoTaxiFiltro.referenciaPonto != undefined && this.pontoTaxiFiltro.referenciaPonto != '') ||
        (this.modalidadeSelecionada != null && this.modalidadeSelecionada != undefined && this.modalidadeSelecionada != '')){
        if(this.buscouTodos)
          this.pageIndex = 0;
        this.consultarPontosTaxiComFiltros();
        this.buscouTodos = 0;
      }else{
        this.buscarTodosPontos();
      }
  }

  voltarPaginaPrincipal(): void {
    this.router.navigate(["/principal"]);
  }

  navegarInserirPontoTaxi(): void {
    this.router.navigate(["ponto-taxi/create"]);
  }

  navegarEditarPontoTaxi(pontoTaxiSelecionado: PontoTaxi): void {
    this.router.navigate(['ponto-taxi/edit'], { state: {data: pontoTaxiSelecionado} });
  }

  consultarPontosTaxiComFiltros() {
      this.loading = true;
      this.pontoTaxiFiltro.modalidade = this.modalidadeSelecionada;

      const request: Observable<PageModelo> = this.pontoTaxiService.consultarPontosTaxiComFiltros(this.pontoTaxiFiltro, this.pageIndex, this.pageSize);
      request.subscribe({
        next: (res) => {
          this.pontosTaxi = (res.content || []).map((item: any) => ({
            idPontoTaxi: item.idPontoTaxi,
            numeroPonto: item.numeroPonto,
            descricaoPonto: item.descricaoPonto,
            fatorRotatividade: item.fatorRotatividade,
            referenciaPonto: item.referenciaPonto,
            numeroVagas: item.numeroVagas,
            modalidade: item.modalidade,
            dataCriacao: item.dataCriacao,
            usuario: item.usuario
          }));
          if (res == null || res.totalElements == 0) {
            this.pontoTaxiService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }
          this.totalPontos = res.totalElements;
          this.pageIndex = res.number;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.pontoTaxiService.showMessageError(error.message);
        }
      });
  }
  openModal(idPontoTaxi: number, descricaoPonto: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir o Ponto de Estacionamento de Táxi: " + idPontoTaxi + " - " + descricaoPonto + " ?";
    dialogConfig.panelClass = "dialogModal";
    this.matDialog.open(PontoTaxiModalComponent, dialogConfig);
  }
}
