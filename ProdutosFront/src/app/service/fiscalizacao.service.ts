import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {FiscalizacaoModelo} from "../components/fiscalizacao/fiscalizacao.model";
import {PageModelo} from "../components/comum/page-modelo.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class FiscalizacaoService {

  snackBar = inject(MatSnackBar);
  baseUrl = environment.urlAplicacao+"/fiscalizacao";
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
  inserirFiscalizacao(fiscalizacao: FiscalizacaoModelo): Observable<FiscalizacaoModelo>{
    return this.http.post<FiscalizacaoModelo>(this.baseUrl+'/inserir', fiscalizacao).pipe(catchError(this.errorHandler));
  }

  editarFiscalizacao(fiscalizacao: FiscalizacaoModelo): Observable<FiscalizacaoModelo>{
    return this.http.post<FiscalizacaoModelo>(this.baseUrl+'/alterar', fiscalizacao).pipe(catchError(this.errorHandler));
  }

  excluirFiscalizacao(idFiscalizacao: number, usuario: string): Observable<String>{
    this.erroMetodo = "Não foi possível excluir a Fiscalização!";
    return this.http.delete<String>(this.baseUrl+'/excluir/'+idFiscalizacao+'/usuario/'+usuario).pipe(catchError(this.errorHandler));
  }

  consultarTodasFiscalizacoes(pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);
    return this.http.get<PageModelo>(this.baseUrl+'/buscar-todos', {params}).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarFiscalizacoesComFiltros(fiscalizacao: FiscalizacaoModelo, pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    if (fiscalizacao.placa)       {  params = params.set('placa', fiscalizacao.placa); }
    if (fiscalizacao.nomePermissionario)       {  params = params.set('nomePermissionario', fiscalizacao.nomePermissionario); }
    if (fiscalizacao.dataFiscalizacao)       {  params = params.set('dataFiscalizacao', fiscalizacao.dataFiscalizacao); }
    if (fiscalizacao.motivoInfracao)       {  params = params.set('motivoInfracao', fiscalizacao.motivoInfracao); }
    if (fiscalizacao.penalidade)       {  params = params.set('penalidade', fiscalizacao.penalidade); }
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);

    return this.http.get<PageModelo>(this.baseUrl+'/buscar-filtros', {params}).pipe(catchError(this.errorHandler)); // catch error
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
