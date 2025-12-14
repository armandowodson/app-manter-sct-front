import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { VeiculoModelo } from "../veiculo-modelo.model";
import { VeiculoFiltro } from "../veiculo-filtro.model";
import { VeiculoService } from "../../../service/veiculo.service";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VeiculoModalComponent } from "../../veiculo-modal-component/veiculo-modal.component";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-veiculo-read",
  templateUrl: "./veiculo-read.component.html"
})
export class VeiculoReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  NODE_TLS_REJECT_UNAUTHORIZED = 0;
  public loading = false;

  veiculoFiltro: VeiculoFiltro = {
    idVeiculo: 0,
    numeroPermissao: "",
    placa: "",
    renavam: "",
    numeroTaximetro: "",
    anoFabricacao: ""
  };

  veiculos: VeiculoModelo[] = [];
  errors: string;
  page: number = 1;
  contador: number = 15;
  tamanho: number;
  placa: string;
  nomeLogado: string;

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.tamanho = 0;
    this.placa = "";
    this.nomeLogado = "";
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    this.veiculoService.consultarTodosVeiculos().subscribe(
      (veiculos) => {
        if (veiculos.length == 0) {
          this.veiculoService.showMessageAlert(
            "A consulta não retornou resultado!"
          );
        }

        this.veiculos = veiculos;
        this.tamanho = this.veiculos.length;
      },
      (error) => {
        this.errors = error;
        this.veiculoService.showMessageError(this.errors);
      }
    );
  }

  voltarPaginaPrincipal(): void {
    this.router.navigate(["/principal"]);
  }

  navegarInserirVeiculo(): void {
    this.router.navigate(["veiculo/create"]);
  }

  navegarEditarVeiculo(veiculoSelecionado: VeiculoFiltro): void {
    this.router.navigate(['veiculo/edit'], { state: {data: veiculoSelecionado} });
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  consultarVeiculoComFiltros() {
    this.loading = true;

    this.veiculoService
      .consultarVeiculosComFiltros(this.veiculoFiltro)
      .subscribe(
        (veiculos) => {
          if (veiculos.length == 0) {
            this.veiculoService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }
          this.veiculos = veiculos;
          this.tamanho = this.veiculos.length;
          this.loading = false;
        },
        (error) => {
          this.errors = error;
          this.veiculoService.showMessageError(this.errors);
          this.loading = false;
        }
      );
  }

  confirmarExclusao(message?: string) {
    return new Promise((resolve) => {
      return resolve(window.confirm(message || "Confirma ?"));
    });
  }

  openModal(idVeiculo: number, nomeVeiculo: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir o Veículo: " + idVeiculo + " - " + nomeVeiculo + " ?";
    dialogConfig.panelClass = "dialogModal";
    const modalDialog = this.matDialog.open(VeiculoModalComponent, dialogConfig);
  }

  excluirVeiculo(idVeiculo: number) {
    for (var i = 0; i < this.veiculos.length; i++) {
      if (this.veiculos[i].idVeiculo == idVeiculo) {
        this.placa = this.veiculos[i].placa;
        i = this.veiculos.length;
      }
    }
    this.confirmarExclusao(
      "Deseja excluir o Veículo: " + idVeiculo + ": " + this.placa + " ?"
    ).then((podeDeletar) => {
      if (podeDeletar) {
        this.veiculoService.excluirVeiculo(idVeiculo, environment.usuarioLogado).subscribe(() => {
            this.veiculoService.showMessageSuccess("Veículo Excluído com Sucesso!!!");
            this.router.navigate(['/veiculo']);
          },
          (error) => {
            this.errors = error;
            this.veiculoService.showMessageError(this.errors);
          }
        );
      }
    });
  }

  getPagedData(data: VeiculoFiltro[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
}
