import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { PermissionarioFiltro } from "../permissionario-filtro.model";
import { PermissionarioService } from "../../../service/permissionario.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PermissionarioModalComponent } from "../../permissionario-modal-component/permissionario-modal.component";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {PageModelo} from "../../comum/page-modelo.model";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-permissionario-read",
  templateUrl: "./permissionario-read.component.html"
})
export class PermissionarioReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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

  permissionarios: any[] = [];
  errors: string;
  nomePermissionario: string;
  nomeLogado: string;
  totalPermissionarios: number;
  pageIndex: number;
  pageSize: number;
  buscouTodos: number;

  constructor(
    private permissionarioService: PermissionarioService,
    private router: Router,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.nomePermissionario = "";
    this.nomeLogado = environment.nomeLogado;
    this.totalPermissionarios = 0;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.buscouTodos = 0;
  }

  ngOnInit(): void {
    this.nomeLogado = environment.nomeLogado;
    this.buscarTodosPermissionarios();

  }

  buscarTodosPermissionarios(){
    this.loading = true;
    this.buscouTodos = 1;
    const request: Observable<PageModelo> = this.permissionarioService.consultarTodosPermissionarios(this.pageIndex, this.pageSize);
    request.subscribe({
      next: (res) => {
        if (res == null || res.totalElements == 0) {
          this.permissionarioService.showMessageAlert(
            "A consulta não retornou resultado!"
          );
        }

        this.permissionarios = (res.content || []).map((item: any) => ({
          idPermissionario: item.idPermissionario,
          numeroPermissao: item.numeroPermissao,
          nomePermissionario: item.nomePermissionario,
          cpfPermissionario: item.cpfPermissionario,
          cnpjEmpresa: item.cnpjEmpresa,
          rgPermissionario: item.rgPermissionario,
          orgaoEmissor: item.orgaoEmissor,
          naturezaPessoa: item.naturezaPessoa,
          ufPermissionario: item.ufPermissionario,
          cidadePermissionario: item.cidadePermissionario,
          bairroPermissionario: item.bairroPermissionario,
          enderecoPermissionario: item.enderecoPermissionario,
          celularPermissionario: item.celularPermissionario,
          cnhPermissionario: item.cnhPermissionario,
          categoriaCnhPermissionario: item.categoriaCnhPermissionario,
          numeroQuitacaoMilitar: item.numeroQuitacaoMilitar,
          numeroQuitacaoEleitoral: item.numeroQuitacaoEleitoral,
          numeroInscricaoInss: item.numeroInscricaoInss,
          numeroCertificadoCondutor: item.numeroCertificadoCondutor,
          dataCriacao: item.dataCriacao,
          usuario: item.usuario,
          status: item.status,
          aplicativoAlternativo: item.aplicativoAlternativo,
          observacao: item.observacao
        }));
        this.totalPermissionarios = res.totalElements;
        this.pageIndex = res.number;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.permissionarioService.showMessageError(error.message);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if((this.permissionarioFiltro.numeroPermissao != null && this.permissionarioFiltro.numeroPermissao != undefined && this.permissionarioFiltro.numeroPermissao != '') ||
      (this.permissionarioFiltro.nomePermissionario != null && this.permissionarioFiltro.nomePermissionario != undefined && this.permissionarioFiltro.nomePermissionario != '') ||
      (this.permissionarioFiltro.cpfPermissionario != null && this.permissionarioFiltro.cpfPermissionario != undefined && this.permissionarioFiltro.cpfPermissionario != '') ||
      (this.permissionarioFiltro.cnpjEmpresa != null && this.permissionarioFiltro.cnpjEmpresa != undefined && this.permissionarioFiltro.cnpjEmpresa != '') ||
      (this.permissionarioFiltro.cnhPermissionario != null && this.permissionarioFiltro.cnhPermissionario != undefined && this.permissionarioFiltro.cnhPermissionario != '')){
      if(this.buscouTodos)
        this.pageIndex = 0;
      this.consultarPermissionariosComFiltros();
      this.buscouTodos = 0;
    }else{
      this.buscarTodosPermissionarios();
    }
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
  consultarPermissionariosComFiltros() {
    this.loading = true;

    const request: Observable<PageModelo> = this.permissionarioService.consultarPontosTaxiComFiltros(
      this.permissionarioFiltro, this.pageIndex, this.pageSize);
    request.subscribe({
      next: (res) => {
        if (res == null || res.totalElements == 0) {
          this.permissionarioService.showMessageAlert(
            "A consulta não retornou resultado!"
          );
        }

        this.permissionarios = (res.content || []).map((item: any) => ({
          idPermissionario: item.idPermissionario,
          numeroPermissao: item.numeroPermissao,
          nomePermissionario: item.nomePermissionario,
          cpfPermissionario: item.cpfPermissionario,
          cnpjEmpresa: item.cnpjEmpresa,
          rgPermissionario: item.rgPermissionario,
          orgaoEmissor: item.orgaoEmissor,
          naturezaPessoa: item.naturezaPessoa,
          ufPermissionario: item.ufPermissionario,
          cidadePermissionario: item.cidadePermissionario,
          bairroPermissionario: item.bairroPermissionario,
          enderecoPermissionario: item.enderecoPermissionario,
          celularPermissionario: item.celularPermissionario,
          cnhPermissionario: item.cnhPermissionario,
          categoriaCnhPermissionario: item.categoriaCnhPermissionario,
          numeroQuitacaoMilitar: item.numeroQuitacaoMilitar,
          numeroQuitacaoEleitoral: item.numeroQuitacaoEleitoral,
          numeroInscricaoInss: item.numeroInscricaoInss,
          numeroCertificadoCondutor: item.numeroCertificadoCondutor,
          dataCriacao: item.dataCriacao,
          usuario: item.usuario,
          status: item.status,
          aplicativoAlternativo: item.aplicativoAlternativo,
          observacao: item.observacao
        }));
        this.totalPermissionarios = res.totalElements;
        this.pageIndex = res.number;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.permissionarioService.showMessageError(error.message);
      }
    });
  }

  openModal(idPermissionario: number, nomePermissionario: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir o Permissionário: " + idPermissionario + " - " + nomePermissionario + " ?";
    dialogConfig.panelClass = "dialogModal";
    environment.idSelecionado = idPermissionario;
    this.matDialog.open(PermissionarioModalComponent, dialogConfig);
  }
}
