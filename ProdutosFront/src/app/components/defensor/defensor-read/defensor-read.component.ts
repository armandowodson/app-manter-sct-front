import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { DefensorFiltro } from "../defensor-filtro.model";
import { DefensorService } from "../../../service/defensor.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
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
    cnhDefensor: "",
    dataCriacao: "",
    nomePermissionario: "",
    cpfPermissionario: ""
  };

  defensores: any[] = [];
  errors: string;
  nomeDefensor: string;
  nomeLogado: string;
  totalDefensores: number;
  pageIndex: number;
  pageSize: number;
  buscouTodos: number;

  constructor(
    private defensorService: DefensorService,
    private router: Router,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.nomeDefensor = "";
    this.nomeLogado = environment.nomeLogado;
    this.totalDefensores = 0;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.buscouTodos = 0;
  }

  ngOnInit(): void {
    this.loading = true;
    this.nomeLogado = environment.nomeLogado;

    this.buscarTodosDefensores()
  }

  buscarTodosDefensores(){
    this.loading = true;
    this.buscouTodos = 1;

    this.defensorService.consultarTodosDefensores(this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        if (res == null || res.totalElements == 0) {
          this.defensorService.showMessageAlert(
            "A consulta não retornou resultado!"
          );
        }

        this.defensores = (res.content || []).map((item: any) => ({
          idDefensor: item.idDefensor,
          numeroPermissao: item.numeroPermissao,
          nomeDefensor: item.nomeDefensor,
          cpfDefensor: item.cpfDefensor,
          rgDefensor: item.rgDefensor,
          orgaoEmissor: item.orgaoEmissor,
          naturezaPessoa: item.naturezaPessoa,
          ufDefensor: item.ufDefensor,
          cidadeDefensor: item.cidadeDefensor,
          bairroDefensor: item.bairroDefensor,
          enderecoDefensor: item.enderecoDefensor,
          celularDefensor: item.celularDefensor,
          cnhDefensor: item.cnhDefensor,
          categoriaCnhDefensor: item.categoriaCnhDefensor,
          numeroQuitacaoMilitar: item.numeroQuitacaoMilitar,
          numeroQuitacaoEleitoral: item.numeroQuitacaoEleitoral,
          numeroInscricaoInss: item.numeroInscricaoInss,
          numeroCertificadoCondutor: item.numeroCertificadoCondutor,
          dataCriacao: item.dataCriacao,
          usuario: item.usuario,
          status: item.status
        }));
        this.totalDefensores = res.totalElements;
        this.pageIndex = res.number;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.defensorService.showMessageError(error.message);
      }
    });

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
  consultarDefensoresComFiltros() {
    this.loading = true;

    this.defensorService.consultarDefensoresComFiltros(this.defensorFiltro, this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        if (res == null || res.totalElements == 0) {
          this.defensorService.showMessageAlert(
            "A consulta não retornou resultado!"
          );
        }

        this.defensores = (res.content || []).map((item: any) => ({
          idDefensor: item.idDefensor,
          numeroPermissao: item.numeroPermissao,
          nomeDefensor: item.nomeDefensor,
          cpfDefensor: item.cpfDefensor,
          rgDefensor: item.rgDefensor,
          orgaoEmissor: item.orgaoEmissor,
          naturezaPessoa: item.naturezaPessoa,
          ufDefensor: item.ufDefensor,
          cidadeDefensor: item.cidadeDefensor,
          bairroDefensor: item.bairroDefensor,
          enderecoDefensor: item.enderecoDefensor,
          celularDefensor: item.celularDefensor,
          cnhDefensor: item.cnhDefensor,
          categoriaCnhDefensor: item.categoriaCnhDefensor,
          numeroQuitacaoMilitar: item.numeroQuitacaoMilitar,
          numeroQuitacaoEleitoral: item.numeroQuitacaoEleitoral,
          numeroInscricaoInss: item.numeroInscricaoInss,
          numeroCertificadoCondutor: item.numeroCertificadoCondutor,
          dataCriacao: item.dataCriacao,
          usuario: item.usuario,
          status: item.status
        }));
        this.totalDefensores = res.totalElements;
        this.pageIndex = res.number;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.defensorService.showMessageError(error.message);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if((this.defensorFiltro.numeroPermissao != null && this.defensorFiltro.numeroPermissao != undefined && this.defensorFiltro.numeroPermissao != '') ||
      (this.defensorFiltro.nomeDefensor != null && this.defensorFiltro.nomeDefensor != undefined && this.defensorFiltro.nomeDefensor != '') ||
      (this.defensorFiltro.cpfDefensor != null && this.defensorFiltro.cpfDefensor != undefined && this.defensorFiltro.cpfDefensor != '') ||
      (this.defensorFiltro.cnhDefensor != null && this.defensorFiltro.cnhDefensor != undefined && this.defensorFiltro.cnhDefensor != '') ||
      (this.defensorFiltro.nomePermissionario != null && this.defensorFiltro.nomePermissionario != undefined && this.defensorFiltro.nomePermissionario != '') ||
      (this.defensorFiltro.cpfPermissionario != null && this.defensorFiltro.cpfPermissionario != undefined && this.defensorFiltro.cpfPermissionario != '')){
      if(this.buscouTodos)
        this.pageIndex = 0;
      this.consultarDefensoresComFiltros();
      this.buscouTodos = 0;
    }else{
      this.buscarTodosDefensores();
    }
  }

  openModal(idDefensor: number, nomeDefensor: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir o Defensor: " + idDefensor + " - " + nomeDefensor + " ?";
    dialogConfig.panelClass = "dialogModal";
    environment.idSelecionado = idDefensor;
    this.matDialog.open(DefensorModalComponent, dialogConfig);
  }
}
