import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {PontoTaxiModelo} from "../components/pontos-taxi/ponto-taxi.model";
import {PageModelo} from "../components/comum/page-modelo.model";

@Injectable({
  providedIn: 'root'
})

export class PontoTaxiService {

  snackBar = inject(MatSnackBar);
  baseUrl = "http://localhost:9190/ponto-taxi";
  erroMetodo  = "";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, handler: HttpBackend) { }

  public showMessageSuccess(message: string) {
    let config = this.configurarSnackBar('success-snackbar');
    this.snackBar.open(message, 'X', config);
  }

  public showMessageError(message: string) {
    let config = this.configurarSnackBar('error-snackbar');
    this.snackBar.open(message, 'X', config);
  }

  public showMessageAlert(message: string) {
    let config = this.configurarSnackBar('alert-snackbar');
    this.snackBar.open(message, 'X', config);
  }

  configurarSnackBar(tipoAlert: string): MatSnackBarConfig{
    let config = new MatSnackBarConfig();
    config.duration = 6000;
    config.panelClass = [tipoAlert]
    config.verticalPosition = 'top';
    return config;
  }
  inserirPontoTaxi(pontoTaxi: PontoTaxiModelo): Observable<PontoTaxiModelo>{
    return this.http.post<PontoTaxiModelo>(this.baseUrl+'/inserir', pontoTaxi).pipe(catchError(this.errorHandlerInserir));
  }

  editarPontoTaxi(pontoTaxi: PontoTaxiModelo): Observable<PontoTaxiModelo>{
    return this.http.post<PontoTaxiModelo>(this.baseUrl+'/alterar', pontoTaxi).pipe(catchError(this.errorHandlerAlterar));
  }

  excluirPontoTaxi(idPontoTaxi: number, usuario: string): Observable<String>{
    this.erroMetodo = "Não foi possível excluir o Ponto de Táxi!";
    return this.http.delete<String>(this.baseUrl+'/excluir/'+idPontoTaxi+'/usuario/'+usuario).pipe(catchError(this.errorHandlerExcluir));
  }

  consultarTodosPontosTaxi(pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);
    return this.http.get<PageModelo>(this.baseUrl+'/buscar-todos', {params}).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPontosTaxiDisponiveis(): Observable<PontoTaxiModelo[]> {
    return this.http.get<PontoTaxiModelo[]>(this.baseUrl+'/buscar-disponiveis').pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPontosTaxiComFiltros(pontoTaxi: PontoTaxiModelo, pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    if (pontoTaxi.numeroPonto)       {  params = params.set('numeroPonto', pontoTaxi.numeroPonto); }
    if (pontoTaxi.descricaoPonto)       {  params = params.set('descricaoPonto', pontoTaxi.descricaoPonto); }
    if (pontoTaxi.fatorRotatividade)       {  params = params.set('fatorRotatividade', pontoTaxi.fatorRotatividade); }
    if (pontoTaxi.numeroVagas)       {  params = params.set('numeroVagas', pontoTaxi.numeroVagas); }
    if (pontoTaxi.referenciaPonto)       {  params = params.set('referenciaPonto', pontoTaxi.referenciaPonto); }
    if (pontoTaxi.modalidade)       {  params = params.set('modalidade', pontoTaxi.modalidade); }
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);

    return this.http.get<PageModelo>(this.baseUrl+'/buscar-filtros', {params}).pipe(catchError(this.errorHandler)); // catch error
  }
  errorHandlerAlterar() {
    return throwError("Ocorreu um erro ao Alterar o Ponto de Táxi!");
  }

  errorHandlerInserir() {
    return throwError("Ocorreu um erro ao Inserir o Ponto de Táxi!");
  }

  errorHandlerExcluir() {
    return throwError("Ocorreu um erro ao Excluir o Ponto de Táxi!");
  }

  errorHandler() {
    return throwError("Ocorreu um erro! Operação não concluída!");
  }
}
