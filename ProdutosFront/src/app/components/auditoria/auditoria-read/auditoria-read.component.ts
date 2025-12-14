import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { AuditoriaModelo } from "../auditoria-modelo.model";
import { AuditoriaFiltro } from "../auditoria-filtro.model";
import { AuditoriaService } from "../../../service/auditoria.service";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-auditoria-read",
  templateUrl: "./auditoria-read.component.html"
})
export class AuditoriaReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  NODE_TLS_REJECT_UNAUTHORIZED = 0;
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

  auditorias: AuditoriaModelo[] = [];
  errors: string;
  page: number = 1;
  contador: number = 15;
  tamanho: number;
  nomeAuditoria: string;
  nomeLogado: string;

  constructor(
    private auditoriaService: AuditoriaService,
    private router: Router
  ) {
    this.errors = "";
    this.tamanho = 0;
    this.nomeAuditoria = "";
    this.nomeLogado = "";
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    this.auditoriaService.consultarTodasAuditorias().subscribe(
      (audits) => {
        if (audits.length == 0) {
          this.auditoriaService.showMessageAlert(
            "A consulta não retornou resultado!"
          );
        }
        this.auditorias = audits;
        this.tamanho = this.auditorias.length;
      },
      (error) => {
        this.errors = error;
        this.auditoriaService.showMessageError(this.errors);
      }
    );
  }

  voltarPaginaPrincipal(): void {
    this.router.navigate(["/principal"]);
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  consultarAuditoriaComFiltros() {
    this.loading = true;

    this.auditoriaFiltro.operacao = this.operacaoSelecionada;
    this.auditoriaService
      .consultarAuditoriaComFiltros(this.auditoriaFiltro)
      .subscribe(
        (auditorias) => {
          if (auditorias.length == 0) {
            this.auditoriaService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }
          this.auditorias = auditorias;
          this.tamanho = this.auditorias.length;
          this.loading = false;
        },
        (error) => {
          this.errors = error;
          this.auditoriaService.showMessageError(this.errors);
          this.loading = false;
        }
      );
  }

  getPagedData(data: AuditoriaFiltro[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
}
