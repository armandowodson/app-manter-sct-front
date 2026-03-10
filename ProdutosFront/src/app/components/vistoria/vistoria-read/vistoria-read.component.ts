import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { VistoriaModelo } from "../vistoria-modelo.model";
import { VistoriaFiltro } from "../vistoria-filtro.model";
import { VistoriaService } from "../../../service/vistoria.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VistoriaModalComponent } from "../../vistoria-modal-component/vistoria-modal.component";
import {environment} from "../../../../environments/environment";
import {LoadingService} from "../../../service/loading.service";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-vistoria-read",
  templateUrl: "./vistoria-read.component.html"
})
export class VistoriaReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public loading = false;

  vistoriaFiltro: VistoriaFiltro = {
    numeroPermissao: "",
    placa: "",
    statusVistoria: ""
  };

  vistorias: any[] = [];
  errors: string;
  nomeLogado: string;
  totalVistorias: number;
  pageIndex: number;
  pageSize: number;
  buscouTodos: number;

  statusVistoriaSelecionada = "";
  statusVistoriaOptions = [
    { id: '1', nome: 'APROVADO' },
    { id: '2', nome: 'RESSALVAS' },
    { id: '3', nome: 'REPROVADO' }
  ];

  constructor(
    private vistoriaService: VistoriaService,
    private loadingService: LoadingService,
    private router: Router,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.nomeLogado = "";
    this.totalVistorias = 0;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.buscouTodos = 0;
  }

  ngOnInit(): void {
      this.loading = true;
      this.nomeLogado = environment.nomeLogado;

      this.buscarTodosVistorias();
  }

  buscarTodosVistorias(){
      this.loading = true;
      this.buscouTodos = 1;

      this.vistoriaService.consultarTodasVistorias(this.pageIndex, this.pageSize).subscribe({
        next: (res) => {
          if (res == null || res.totalElements == 0) {
            this.vistoriaService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }

          this.vistorias = (res.content || []).map((item: any) => ({
            idVistoria: item.idVistoria,
            idVeiculo: item.idVeiculo,
            chassiFunilariaPintura: item.chassiFunilariaPintura,
            instalacaoEletrica: item.instalacaoEletrica,
            farolAtlaBaixa: item.farolAtlaBaixa,
            buzina: item.buzina,
            lanternaTraseira: item.lanternaTraseira,
            freioDianteiro: item.freioDianteiro,
            luzPlaca: item.luzPlaca,
            freioTraseiro: item.freioTraseiro,
            luzesDirecao: item.luzesDirecao,
            pneusDesgateCalibragem: item.pneusDesgateCalibragem,
            luzFreio: item.luzFreio,
            correnteCorreia: item.correnteCorreia,
            placasDianteiraTraseira: item.placasDianteiraTraseira,
            vazamentoOleoCombustivel: item.vazamentoOleoCombustivel,
            limpezaGeralInterna: item.limpezaGeralInterna,
            escapamento: item.escapamento,
            assentoFixacao: item.assentoFixacao,
            equipamentosObrigatorios: item.equipamentosObrigatorios,
            espelhosRetrovisores: item.espelhosRetrovisores,
            selosVistoria: item.selosVistoria,
            guidaoManoplas: item.guidaoManoplas,
            outros: item.outros,
            dataVistoria: item.dataVistoria,
            dataRetorno: item.dataRetorno,
            statusVistoria: item.statusVistoria,
            ressalvas: item.ressalvas,
            observacao: item.observacao,
            dataCriacao: item.dataCriacao,
            usuario: item.usuario,
            status: item.status
          }));
          this.totalVistorias = res.totalElements;
          this.pageIndex = res.number;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.vistoriaService.showMessageError(error.message.replace("Error: ", ""));
        }
      });
  }

  voltarPaginaPrincipal(): void {
    this.router.navigate(["/principal"]);
  }

  navegarInserirVistoria(): void {
    this.router.navigate(["vistoria/create"]);
  }

  navegarEditarVistoria(vistoriaSelecionado: VistoriaFiltro): void {
    this.router.navigate(['vistoria/edit'], { state: {data: vistoriaSelecionado} });
  }

  consultarVistoriaComFiltros() {
      this.loading = true;

      this.vistoriaFiltro.statusVistoria = this.statusVistoriaSelecionada;
      this.vistoriaService.consultarVistoriasComFiltros(this.vistoriaFiltro, this.pageIndex, this.pageSize).subscribe({
          next: (res) => {
            if (res == null || res.totalElements == 0) {
              this.vistoriaService.showMessageAlert(
                "A consulta não retornou resultado!"
              );
            }

            this.vistorias = (res.content || []).map((item: any) => ({
              idVistoria: item.idVistoria,
              idVeiculo: item.idVeiculo,
              chassiFunilariaPintura: item.chassiFunilariaPintura,
              instalacaoEletrica: item.instalacaoEletrica,
              farolAtlaBaixa: item.farolAtlaBaixa,
              buzina: item.buzina,
              lanternaTraseira: item.lanternaTraseira,
              freioDianteiro: item.freioDianteiro,
              luzPlaca: item.luzPlaca,
              freioTraseiro: item.freioTraseiro,
              luzesDirecao: item.luzesDirecao,
              pneusDesgateCalibragem: item.pneusDesgateCalibragem,
              luzFreio: item.luzFreio,
              correnteCorreia: item.correnteCorreia,
              placasDianteiraTraseira: item.placasDianteiraTraseira,
              vazamentoOleoCombustivel: item.vazamentoOleoCombustivel,
              limpezaGeralInterna: item.limpezaGeralInterna,
              escapamento: item.escapamento,
              assentoFixacao: item.assentoFixacao,
              equipamentosObrigatorios: item.equipamentosObrigatorios,
              espelhosRetrovisores: item.espelhosRetrovisores,
              selosVistoria: item.selosVistoria,
              guidaoManoplas: item.guidaoManoplas,
              outros: item.outros,
              dataVistoria: item.dataVistoria,
              dataRetorno: item.dataRetorno,
              statusVistoria: item.statusVistoria,
              ressalvas: item.ressalvas,
              observacao: item.observacao,
              dataCriacao: item.dataCriacao,
              usuario: item.usuario,
              status: item.status
            }));
            this.totalVistorias = res.totalElements;
            this.pageIndex = res.number;
            this.loading = false;
          },
          error: (error) => {
            this.loading = false;
            this.vistoriaService.showMessageError(error.message.replace("Error: ", ""));
          }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if((this.vistoriaFiltro.numeroPermissao != null && this.vistoriaFiltro.numeroPermissao != undefined && this.vistoriaFiltro.numeroPermissao != '') ||
      (this.vistoriaFiltro.placa != null && this.vistoriaFiltro.placa != undefined && this.vistoriaFiltro.placa != '') ||
      (this.vistoriaFiltro.statusVistoria != null && this.vistoriaFiltro.statusVistoria != undefined && this.vistoriaFiltro.statusVistoria != '')){
      if(this.buscouTodos)
        this.pageIndex = 0;
      this.consultarVistoriaComFiltros();
      this.buscouTodos = 0;
    }else{
      this.buscarTodosVistorias();
    }
  }

  openModal(idVistoria: number, nomeVistoria: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir o Laudo de Vistoria: " + idVistoria + " - " + nomeVistoria + " ?";
    dialogConfig.panelClass = "dialogModal";
    environment.idSelecionado = idVistoria;
    this.matDialog.open(VistoriaModalComponent, dialogConfig);
  }

  gerarLaudoVistoria(vistoriaSelecionada: VistoriaModelo): void {
    this.vistoriaService.gerarLaudoVistoria(vistoriaSelecionada, environment.moduloSelecionado).subscribe({
      next: (vistorias) => {
        if (vistorias.byteLength == 0) {
          this.vistoriaService.showMessageAlert(
            "Não há dados para imprimir!"
          );
        }
        const blob = new Blob([vistorias], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');

        this.loadingService.hide();
        this.vistoriaService.showMessageSuccess("Laudo de Vistoria gerado com sucesso!");
      },
      error: (error) => {
        this.loadingService.hide();
        this.vistoriaService.showMessageError(error.message.replace("Error: ", ""));
      }
    });
  }
}
