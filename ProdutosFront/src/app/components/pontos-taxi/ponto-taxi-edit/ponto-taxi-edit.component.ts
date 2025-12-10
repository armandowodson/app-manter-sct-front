import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {PontoTaxi} from "../ponto-taxi.model";
import {PontoTaxiService} from "../../../service/ponto-taxi.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-ponto-taxi-edit',
  templateUrl: './ponto-taxi-edit.component.html',
})

@Injectable({
    providedIn: 'root'
})

export class PontoTaxiEditComponent implements OnInit {

  pontoTaxi: PontoTaxi = {
    idPontoTaxi: 0,
    numeroPonto: "",
    descricaoPonto: "",
    fatorRotatividade: "",
    referenciaPonto: "",
    numeroVagas: "",
    dataCriacao: "",
    usuario: ""
  };

  errors: string;
  id: string;

  constructor(private pontoTaxiService: PontoTaxiService,
              private router: Router,
              private currencyPipe : CurrencyPipe) {
    this.errors = '';
    this.id = '';
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.pontoTaxi.idPontoTaxi = history.state.data.idPontoTaxi;
      this.pontoTaxi.numeroPonto = history.state.data.numeroPonto;
      this.pontoTaxi.descricaoPonto = history.state.data.descricaoPonto;
      this.pontoTaxi.fatorRotatividade = history.state.data.fatorRotatividade;
      this.pontoTaxi.referenciaPonto = history.state.data.referenciaPonto;
      this.pontoTaxi.numeroVagas = history.state.data.numeroVagas;
    }
  }

  consultarPontoTaxiId(id: number){
    this.pontoTaxi.idPontoTaxi = id;
    this.pontoTaxiService.consultarPontoTaxiId(this.pontoTaxi).subscribe(ponto => {
        if (ponto == null){
            this.pontoTaxiService.showMessageAlert('A consulta não retornou resultado!');
        }
        this.pontoTaxi.idPontoTaxi = ponto.idPontoTaxi;
        this.pontoTaxi.numeroPonto = ponto.numeroPonto;
        this.pontoTaxi.descricaoPonto = ponto.descricaoPonto;
        this.pontoTaxi.fatorRotatividade = ponto.fatorRotatividade;
        this.pontoTaxi.referenciaPonto = ponto.referenciaPonto;
        this.pontoTaxi.numeroVagas = ponto.numeroVagas;

    },
      error => {
        this.errors = error
        this.pontoTaxiService.showMessageError(this.errors);
    });
  }

  editarPontoTaxi(): void{
    this.pontoTaxi.usuario = environment.usuarioLogado;
    this.pontoTaxiService.editarPontoTaxi(this.pontoTaxi).subscribe(() => {
      this.pontoTaxiService.showMessageSuccess('Ponto de Táxi Atualizado com Sucesso!!!');
      this.router.navigate(['/ponto-taxi']);
    },
    error => {
        this.errors = error
        this.pontoTaxiService.showMessageError(this.errors);
    });
  }

  voltar(): void{
    this.router.navigate(['/ponto-taxi']);
  }
}
