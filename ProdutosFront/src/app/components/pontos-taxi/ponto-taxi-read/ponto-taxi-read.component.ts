import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import {PontoTaxi} from "../ponto-taxi.model";
import { PontoTaxiService } from "../../../service/ponto-taxi.service";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PontoTaxiModalComponent } from "../../ponto-taxi-modal-component/ponto-taxi-modal.component";

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

  pontoTaxi: PontoTaxi = {
    idPontoTaxi: 0,
    numeroPonto: "",
    descricaoPonto: "",
    fatorRotatividade: "",
    referenciaPonto: "",
    numeroVagas: "",
    dataCriacao: ""
  };

  pontosTaxi: PontoTaxi[] = [];
  displayedColumns = ["idPontoTaxi", "numeroPonto", "descricaoPonto", "fatorRotatividade", "referenciaPonto", "dataCriacao", "acoes"];
  errors: string;
  page: number = 1;
  contador: number = 5;
  tamanho: number;
  descricaoPonto: string;

  constructor(
    private pontoTaxiService: PontoTaxiService,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.tamanho = 0;
    this.descricaoPonto = "";
  }

  ngOnInit(): void {
    this.pontoTaxiService.consultarTodosPontosTaxi().subscribe(
      (pontos) => {
        if (pontos.length == 0) {
          this.pontoTaxiService.showMessageAlert(
            "A consulta não retornou resultado!"
          );
        }
        this.pontosTaxi = pontos;
        this.tamanho = this.pontosTaxi.length;
      },
      (error) => {
        this.errors = error;
        this.pontoTaxiService.showMessageError(this.errors);
      }
    );
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

  handlePageChange(event: number) {
    this.page = event;
  }

  consultarPontosTaxiComFiltros() {
    this.loading = true;

    this.pontoTaxiService
      .consultarPontosTaxiComFiltros(this.pontoTaxi)
      .subscribe(
        (pontos) => {
          if (pontos.length == 0) {
            this.pontoTaxiService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }
          this.pontosTaxi = pontos;
          this.tamanho = this.pontosTaxi.length;
          this.loading = false;
        },
        (error) => {
          this.errors = error;
          this.pontoTaxiService.showMessageError(this.errors);
          this.loading = false;
        }
      );
  }

  confirmarExclusao(message?: string) {
    return new Promise((resolve) => {
      return resolve(window.confirm(message || "Confirma ?"));
    });
  }

  openModal(idPontoTaxi: number, descricaoPonto: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir o Ponto de Táxi: " + idPontoTaxi + " - " + descricaoPonto + " ?";
    dialogConfig.panelClass = "dialogModal";
    const modalDialog = this.matDialog.open(PontoTaxiModalComponent, dialogConfig);
  }

  excluirPontoTaxi(idPontoTaxi: number) {
    for (var i = 0; i < this.pontosTaxi.length; i++) {
      if (this.pontosTaxi[i].idPontoTaxi == idPontoTaxi) {
        this.descricaoPonto = this.pontosTaxi[i].descricaoPonto;
        i = this.pontosTaxi.length;
      }
    }
    this.confirmarExclusao(
      "Deseja excluir o Ponto de Táxi: " + idPontoTaxi + ": " + this.descricaoPonto + " ?"
    ).then((podeDeletar) => {
      if (podeDeletar) {
        this.pontoTaxiService.excluirPontoTaxi(idPontoTaxi).subscribe(() => {
            this.pontoTaxiService.showMessageSuccess("Ponto de Táxi Excluído com Sucesso!!!");
            this.router.navigate(['/ponto-taxi']);
          },
          (error) => {
            this.errors = error;
            this.pontoTaxiService.showMessageError(this.errors);
          }
        );
      }
    });
  }

  getPagedData(data: PontoTaxi[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
}
