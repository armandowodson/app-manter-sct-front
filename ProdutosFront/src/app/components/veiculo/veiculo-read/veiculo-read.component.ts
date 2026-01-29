import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { VeiculoModelo } from "../veiculo-modelo.model";
import { VeiculoFiltro } from "../veiculo-filtro.model";
import { VeiculoService } from "../../../service/veiculo.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
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

  public loading = false;

  veiculoFiltro: VeiculoFiltro = {
    idVeiculo: 0,
    numeroPermissao: "",
    placa: "",
    renavam: "",
    numeroTaximetro: "",
    anoFabricacao: ""
  };

  veiculos: any[] = [];
  errors: string;
  placa: string;
  nomeLogado: string;
  totalVeiculos: number;
  pageIndex: number;
  pageSize: number;
  buscouTodos: number;

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    public matDialog: MatDialog
  ) {
    this.errors = "";
    this.placa = "";
    this.nomeLogado = "";
    this.totalVeiculos = 0;
    this.pageIndex = 0;
    this.pageSize = 10;
    this.buscouTodos = 0;
  }

  ngOnInit(): void {
      this.loading = true;
      this.nomeLogado = environment.nomeLogado;

      this.buscarTodosVeiculos();
  }

  buscarTodosVeiculos(){
      this.loading = true;
      this.buscouTodos = 1;

      this.veiculoService.consultarTodosVeiculos(this.pageIndex, this.pageSize).subscribe({
        next: (res) => {
          if (res == null || res.totalElements == 0) {
            this.veiculoService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }

          this.veiculos = (res.content || []).map((item: any) => ({
            idVeiculo: item.idVeiculo,
            idPermissionario: item.idPermissionario,
            numeroPermissao: item.numeroPermissao,
            idPontoTaxi: item.idPontoTaxi,
            placa: item.placa,
            renavam: item.renavam,
            chassi: item.chassi,
            anoFabricacao: item.anoFabricacao,
            marca: item.marca,
            modelo: item.modelo,
            anoModelo: item.anoModelo,
            cor: this.carregarCor(item.cor),
            combustivel: item.combustivel,
            numeroTaximetro: item.numeroTaximetro,
            anoRenovacao: item.anoRenovacao,
            dataVistoria: item.dataVistoria,
            dataRetorno: item.dataRetorno,
            situacaoVeiculo: item.situacaoVeiculo,
            numeroCrlv: item.numeroCrlv,
            anoCrlv: item.anoCrlv,
            certificadoAfericao: item.certificadoAfericao,
            tipoVeiculo: item.tipoVeiculo,
            observacao: item.observacao,
            dataCriacao: item.dataCriacao,
            usuario: item.usuario,
            status: item.status
          }));
          this.totalVeiculos = res.totalElements;
          this.pageIndex = res.number;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.veiculoService.showMessageError(error.message.replace("Error: ", ""));
        }
      });
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

  consultarVeiculoComFiltros() {
      this.loading = true;

      this.veiculoService.consultarVeiculosComFiltros(this.veiculoFiltro, this.pageIndex, this.pageSize).subscribe({
          next: (res) => {
            if (res == null || res.totalElements == 0) {
              this.veiculoService.showMessageAlert(
                "A consulta não retornou resultado!"
              );
            }

            this.veiculos = (res.content || []).map((item: any) => ({
              idVeiculo: item.idVeiculo,
              idPermissionario: item.idPermissionario,
              numeroPermissao: item.numeroPermissao,
              idPontoTaxi: item.idPontoTaxi,
              placa: item.placa,
              renavam: item.renavam,
              chassi: item.chassi,
              anoFabricacao: item.anoFabricacao,
              marca: item.marca,
              modelo: item.modelo,
              anoModelo: item.anoModelo,
              cor: this.carregarCor(item.cor),
              combustivel: item.combustivel,
              numeroTaximetro: item.numeroTaximetro,
              anoRenovacao: item.anoRenovacao,
              dataVistoria: item.dataVistoria,
              dataRetorno: item.dataRetorno,
              situacaoVeiculo: item.situacaoVeiculo,
              numeroCrlv: item.numeroCrlv,
              anoCrlv: item.anoCrlv,
              certificadoAfericao: item.certificadoAfericao,
              tipoVeiculo: item.tipoVeiculo,
              observacao: item.observacao,
              dataCriacao: item.dataCriacao,
              usuario: item.usuario,
              status: item.status
            }));
            this.totalVeiculos = res.totalElements;
            this.pageIndex = res.number;
            this.loading = false;
          },
          error: (error) => {
            this.loading = false;
            this.veiculoService.showMessageError(error.message.replace("Error: ", ""));
          }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if((this.veiculoFiltro.numeroPermissao != null && this.veiculoFiltro.numeroPermissao != undefined && this.veiculoFiltro.numeroPermissao != '') ||
      (this.veiculoFiltro.placa != null && this.veiculoFiltro.placa != undefined && this.veiculoFiltro.placa != '') ||
      (this.veiculoFiltro.renavam != null && this.veiculoFiltro.renavam != undefined && this.veiculoFiltro.renavam != '') ||
      (this.veiculoFiltro.numeroTaximetro != null && this.veiculoFiltro.numeroTaximetro != undefined && this.veiculoFiltro.numeroTaximetro != '') ||
      (this.veiculoFiltro.anoFabricacao != null && this.veiculoFiltro.anoFabricacao != undefined && this.veiculoFiltro.anoFabricacao != '')){
      if(this.buscouTodos)
        this.pageIndex = 0;
      this.consultarVeiculoComFiltros();
      this.buscouTodos = 0;
    }else{
      this.buscarTodosVeiculos();
    }
  }

  openModal(idVeiculo: number, nomeVeiculo: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir o Veículo: " + idVeiculo + " - " + nomeVeiculo + " ?";
    dialogConfig.panelClass = "dialogModal";
    environment.idSelecionado = idVeiculo;
    this.matDialog.open(VeiculoModalComponent, dialogConfig);
  }

/**
 * Loads and returns the color name based on the provided color code
 * @param cor - A string representing the color code (1, 2, or 3)
 * @returns The corresponding color name as a string
 */
  carregarCor(cor: string) {
    // Initialize an empty string to store the color name
    var strCor = "";
    // Switch statement to map color codes to color names
    switch (cor) {
      case "1":
        strCor = "BRANCA";  // Portuguese for WHITE
        break;
      case "2":
        strCor = "PRATA";   // Portuguese for SILVER
        break;
    }
    return strCor;  // Return the color name
  }

}
