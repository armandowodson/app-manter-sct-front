import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import {PontoTaxiModelo} from "../ponto-taxi.model";
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

  pontoTaxiFiltro: PontoTaxiModelo = {
    idPontoTaxi: 0,
    numeroPonto: "",
    descricaoPonto: "",
    fatorRotatividade: "",
    referenciaPonto: "",
    numeroVagas: "",
    modalidade: "",
    dataCriacao: "",
    usuario: "",
    status: ""
  };

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
            modalidade: this.carregarModalidade(item.modalidade),
            dataCriacao: item.dataCriacao,
            usuario: item.usuario,
            status: item.status
          }));
          this.totalPontos = res.totalElements;
          this.pageIndex = res.number;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.pontoTaxiService.showMessageError(error.message.replace("Error: ", ""));
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
        (this.pontoTaxiFiltro.referenciaPonto != null && this.pontoTaxiFiltro.referenciaPonto != undefined && this.pontoTaxiFiltro.referenciaPonto != '')){
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

  navegarEditarPontoTaxi(pontoTaxiSelecionado: PontoTaxiModelo): void {
    this.router.navigate(['ponto-taxi/edit'], { state: {data: pontoTaxiSelecionado} });
  }

  consultarPontosTaxiComFiltros() {
      this.loading = true;

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
            modalidade: this.carregarModalidade(item.modalidade),
            dataCriacao: item.dataCriacao,
            usuario: item.usuario,
            status: item.status
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
          this.pontoTaxiService.showMessageError(error.message.replace("Error: ", ""));
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
    environment.idSelecionado = idPontoTaxi;
    this.matDialog.open(PontoTaxiModalComponent, dialogConfig);
  }

  carregarModalidade(modalidade: string) {
    var strModalidade = "";
    switch (modalidade) {
      case "1":
        strModalidade = "FIXO";
        break;
      case "2":
        strModalidade = "ROTATIVO";
        break;
      case "3":
        strModalidade = "FIXO-ROTATIVO";
        break;
    }
    return strModalidade;
  }
}
