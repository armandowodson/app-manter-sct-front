import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { DefensorModelo } from "../defensor-modelo.model";
import { DefensorFiltro } from "../defensor-filtro.model";
import { DefensorService } from "../../../service/defensor.service";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DefensorModalComponent } from "../../defensor-modal-component/defensor-modal.component";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-defensor-read",
  templateUrl: "./defensor-read.component.html"
})
export class DefensorReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public loading = false;

  defensorFiltro: DefensorFiltro = {
    idDefensor: 0,
    numeroPermissao: "",
    nomeDefensor: "",
    cpfDefensor: "",
    cnpjEmpresa: "",
    cnhDefensor: "",
    dataCriacao: ""
  };

  defensors: DefensorModelo[] = [];
  errors: string;
  page: number = 1;
  contador: number = 15;
  tamanho: number;
  nomeDefensor: string;
  nomeLogado: string;

  constructor(
    private defensorService: DefensorService,
    private router: Router,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.tamanho = 0;
    this.nomeDefensor = "";
    this.nomeLogado = environment.nomeLogado;
  }

  ngOnInit(): void {
    this.defensorService.consultarTodosDefensors().subscribe(
      (defensors) => {
        if (defensors.length == 0) {
          this.defensorService.showMessageAlert(
            "A consulta não retornou resultado!"
          );
        }
        this.defensors = defensors;
        this.tamanho = this.defensors.length;
      },
      (error) => {
        this.errors = error;
        this.defensorService.showMessageError(this.errors);
      }
    );
  }

  voltarPaginaPrincipal(): void {
    this.router.navigate(["/principal"]);
  }

  navegarInserirDefensor(): void {
    this.router.navigate(["defensor/create"]);
  }

  navegarEditarDefensor(defensorSelecionado: DefensorFiltro): void {
    this.router.navigate(['defensor/edit'], { state: {data: defensorSelecionado} });
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  consultarPontosTaxiComFiltros() {
    this.loading = true;

    this.defensorService
      .consultarPontosTaxiComFiltros(this.defensorFiltro)
      .subscribe(
        (pontos) => {
          if (pontos.length == 0) {
            this.defensorService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }
          this.defensors = pontos;
          this.tamanho = this.defensors.length;
          this.loading = false;
        },
        (error) => {
          this.errors = error;
          this.defensorService.showMessageError(this.errors);
          this.loading = false;
        }
      );
  }

  confirmarExclusao(message?: string) {
    return new Promise((resolve) => {
      return resolve(window.confirm(message || "Confirma ?"));
    });
  }

  openModal(idDefensor: number, nomeDefensor: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir o Defensor: " + idDefensor + " - " + nomeDefensor + " ?";
    dialogConfig.panelClass = "dialogModal";
    const modalDialog = this.matDialog.open(DefensorModalComponent, dialogConfig);
  }

  excluirDefensor(idDefensor: number) {
    for (var i = 0; i < this.defensors.length; i++) {
      if (this.defensors[i].idDefensor == idDefensor) {
        this.nomeDefensor = this.defensors[i].nomeDefensor;
        i = this.defensors.length;
      }
    }
    this.confirmarExclusao(
      "Deseja excluir o Defensor: " + idDefensor + ": " + this.nomeDefensor + " ?"
    ).then((podeDeletar) => {
      if (podeDeletar) {
        this.defensorService.excluirDefensor(idDefensor, environment.usuarioLogado).subscribe(() => {
            this.defensorService.showMessageSuccess("Defensor Excluído com Sucesso!!!");
            this.router.navigate(['/defensor']);
          },
          (error) => {
            this.errors = error;
            this.defensorService.showMessageError(this.errors);
          }
        );
      }
    });
  }
}
