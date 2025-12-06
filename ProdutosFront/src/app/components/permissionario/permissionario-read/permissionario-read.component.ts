import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { PermissionarioModelo } from "../permissionario-modelo.model";
import { PermissionarioFiltro } from "../permissionario-filtro.model";
import { PermissionarioService } from "../../../service/permissionario.service";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PermissionarioModalComponent } from "../../permissionario-modal-component/permissionario-modal.component";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-permissionario-read",
  templateUrl: "./permissionario-read.component.html"
})
export class PermissionarioReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  NODE_TLS_REJECT_UNAUTHORIZED = 0;
  public loading = false;

  permissionarioFiltro: PermissionarioFiltro = {
    idPermissionario: 0,
    numeroPermissao: "",
    nomePermissionario: "",
    cpfPermissionario: "",
    cnpjEmpresa: "",
    cnhPermissionario: "",
    dataCriacao: ""
  };

  permissionarios: PermissionarioModelo[] = [];
  displayedColumns = ["idPermissionario", "numeroPermissao", "nomePermissionario", "cpfPermissionario", "cnpjEmpresa", "cnhPermissionario", "dataCriacao", "acoes"];
  errors: string;
  page: number = 1;
  contador: number = 5;
  tamanho: number;
  nomePermissionario: string;

  constructor(
    private permissionarioService: PermissionarioService,
    private router: Router,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.tamanho = 0;
    this.nomePermissionario = "";
  }

  ngOnInit(): void {
    this.permissionarioService.consultarTodosPontosTaxi().subscribe(
      (permissionarios) => {
        if (permissionarios.length == 0) {
          this.permissionarioService.showMessageAlert(
            "A consulta não retornou resultado!"
          );
        }
        this.permissionarios = permissionarios;
        this.tamanho = this.permissionarios.length;
      },
      (error) => {
        this.errors = error;
        this.permissionarioService.showMessageError(this.errors);
      }
    );
  }

  voltarPaginaPrincipal(): void {
    this.router.navigate(["/principal"]);
  }

  navegarInserirPermissionario(): void {
    this.router.navigate(["permissionario/create"]);
  }

  navegarEditarPermissionario(permissionarioSelecionado: PermissionarioFiltro): void {
    this.router.navigate(['permissionario/edit'], { state: {data: permissionarioSelecionado} });
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  consultarPontosTaxiComFiltros() {
    this.loading = true;

    this.permissionarioService
      .consultarPontosTaxiComFiltros(this.permissionarioFiltro)
      .subscribe(
        (pontos) => {
          if (pontos.length == 0) {
            this.permissionarioService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }
          this.permissionarios = pontos;
          this.tamanho = this.permissionarios.length;
          this.loading = false;
        },
        (error) => {
          this.errors = error;
          this.permissionarioService.showMessageError(this.errors);
          this.loading = false;
        }
      );
  }

  confirmarExclusao(message?: string) {
    return new Promise((resolve) => {
      return resolve(window.confirm(message || "Confirma ?"));
    });
  }

  openModal(idPermissionario: number, nomePermissionario: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir o Permissionário: " + idPermissionario + " - " + nomePermissionario + " ?";
    dialogConfig.panelClass = "dialogModal";
    const modalDialog = this.matDialog.open(PermissionarioModalComponent, dialogConfig);
  }

  excluirPermissionario(idPermissionario: number) {
    for (var i = 0; i < this.permissionarios.length; i++) {
      if (this.permissionarios[i].idPermissionario == idPermissionario) {
        this.nomePermissionario = this.permissionarios[i].nomePermissionario;
        i = this.permissionarios.length;
      }
    }
    this.confirmarExclusao(
      "Deseja excluir o Permissionário: " + idPermissionario + ": " + this.nomePermissionario + " ?"
    ).then((podeDeletar) => {
      if (podeDeletar) {
        this.permissionarioService.excluirPermissionario(idPermissionario).subscribe(() => {
            this.permissionarioService.showMessageSuccess("Permissionário Excluído com Sucesso!!!");
            this.router.navigate(['/permissionario']);
          },
          (error) => {
            this.errors = error;
            this.permissionarioService.showMessageError(this.errors);
          }
        );
      }
    });
  }

  getPagedData(data: PermissionarioFiltro[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
}
