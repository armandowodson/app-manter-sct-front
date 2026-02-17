import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import {PageModelo} from "../../comum/page-modelo.model";
import { AuditoriaFiltro } from "../auditoria-filtro.model";
import { AuditoriaService } from "../../../service/auditoria.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { Router } from "@angular/router";
import {environment} from "../../../../environments/environment";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-auditoria-read",
  templateUrl: "./auditoria-read.component.html"
})
export class AuditoriaReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public loading = false;

  auditoriaFiltro: AuditoriaFiltro = {
    idAuditoria: 0,
    nomeModulo: "",
    usuarioOperacao: "",
    operacao: "",
    dataInicioOperacao: "",
    dataFimOperacao: ""
  };

  operacaoSelecionada = "";
  operacaoOptions = [
    { id: 'INCLUSÃO', nome: 'INCLUSÃO' },
    { id: 'ALTERAÇÃO', nome: 'ALTERAÇÃO' },
    { id: 'EXCLUSÃO', nome: 'EXCLUSÃO' }
  ];

  auditorias: any[] = [];

  errors: string;
  nomeAuditoria: string;
  nomeLogado: string;
  totalAuditorias: number;
  pageIndex: number;
  pageSize: number;
  buscouTodos: number;

  constructor(
    private auditoriaService: AuditoriaService,
    private router: Router
  ) {
    this.errors = "";
    this.nomeAuditoria = "";
    this.nomeLogado = "";
    this.totalAuditorias = 0;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.buscouTodos = 0;
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    this.buscarTodasAuditorias();
  }

  buscarTodasAuditorias(){
    this.buscouTodos = 1;
    const request: Observable<PageModelo> = this.auditoriaService.consultarTodasAuditorias(this.pageIndex, this.pageSize);
    request.subscribe({
      next: (res) => {
        this.auditorias = (res.content || []).map((item: any) => ({
          idAuditoria: item.idAuditoria,
          nomeModulo: item.nomeModulo,
          usuarioOperacao: item.usuarioOperacao,
          operacao: item.operacao,
          dataOperacao: item.dataOperacao
        }));
        this.totalAuditorias = res.totalElements;
        this.pageIndex = res.number;
        this.loading = false;
      },
      error: (err) => {
        this.errors = err.message;
        this.loading = false;
        this.auditoriaService.showMessageError(this.errors);
      }
    });
  }

  onPageChange(event: PageEvent): void {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      if((this.auditoriaFiltro.operacao != null && this.auditoriaFiltro.operacao != undefined && this.auditoriaFiltro.operacao != '') ||
         (this.auditoriaFiltro.nomeModulo != null && this.auditoriaFiltro.nomeModulo != undefined && this.auditoriaFiltro.nomeModulo != '') ||
         (this.auditoriaFiltro.usuarioOperacao != null && this.auditoriaFiltro.usuarioOperacao != undefined && this.auditoriaFiltro.usuarioOperacao != '') ||
         (this.auditoriaFiltro.dataInicioOperacao != null && this.auditoriaFiltro.dataInicioOperacao != undefined && this.auditoriaFiltro.dataInicioOperacao != '' &&
           this.auditoriaFiltro.dataFimOperacao != null && this.auditoriaFiltro.dataFimOperacao != undefined && this.auditoriaFiltro.dataFimOperacao != '')){
            if(this.buscouTodos)
              this.pageIndex = 0;
            this.consultarAuditoriaComFiltros();
            this.buscouTodos = 0;
        }else{
            this.buscarTodasAuditorias();
      }
  }

  voltarPaginaPrincipal(): void {
    this.router.navigate(["/principal"]);
  }

  consultarAuditoriaComFiltros() {
    this.loading = true;

    this.auditoriaFiltro.operacao = this.operacaoSelecionada;
    const request: Observable<PageModelo> = this.auditoriaService.consultarAuditoriaComFiltros(this.auditoriaFiltro, this.pageIndex, this.pageSize);
    request.subscribe({
      next: (res) => {
        this.auditorias = (res.content || []).map((item: any) => ({
          idAuditoria: item.idAuditoria,
          nomeModulo: item.nomeModulo,
          usuarioOperacao: item.usuarioOperacao,
          operacao: item.operacao,
          dataOperacao: item.dataOperacao
        }));
        if (res.totalElements == 0) {
          this.auditoriaService.showMessageAlert(
            "A consulta não retornou resultado!"
          );
        }
        this.totalAuditorias = res.totalElements;
        this.pageIndex = res.number;
        this.loading = false;
      },
      error: (err) => {
        this.errors = err.message;
        this.loading = false;
        this.auditoriaService.showMessageError(this.errors);
      }
    });
  }

  imprimirAuditoria() {
    this.loading = true;
    this.auditoriaFiltro.operacao = this.operacaoSelecionada;

    this.auditoriaService.imprimirAuditoria(this.auditoriaFiltro).subscribe({
      next: (auditorias) => {
        if (auditorias.byteLength == 0) {
          this.auditoriaService.showMessageAlert(
            "Não há dados para imprimir!"
          );
        }
        const blob = new Blob([auditorias], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');

        this.auditoriaService.showMessageSuccess("Relatório gerado com sucesso!");
        this.loading = false;
      },
      error: (error) => {
        this.auditoriaService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
  }
}
