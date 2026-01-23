import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {PermissaoModelo} from "../components/permissao/permissao.model";
import {PageModelo} from "../components/comum/page-modelo.model";

@Injectable({
  providedIn: 'root'
})

export class PermissaoService {

  snackBar = inject(MatSnackBar);
  baseUrl = "http://localhost:9190/permissao";
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
  inserirPermissao(permissao: PermissaoModelo): Observable<PermissaoModelo>{
    return this.http.post<PermissaoModelo>(this.baseUrl+'/inserir', permissao).pipe(catchError(this.errorHandler));
  }

  editarPermissao(permissao: PermissaoModelo): Observable<PermissaoModelo>{
    return this.http.post<PermissaoModelo>(this.baseUrl+'/alterar', permissao).pipe(catchError(this.errorHandler));
  }

  excluirPermissao(idPermissao: number, usuario: string): Observable<String>{
    this.erroMetodo = "Não foi possível excluir a Permissão!";
    return this.http.delete<String>(this.baseUrl+'/excluir/'+idPermissao+'/usuario/'+usuario).pipe(catchError(this.errorHandler));
  }

  consultarPermissoesDisponiveis(): Observable<PermissaoModelo[]> {
    return this.http.get<PermissaoModelo[]>(this.baseUrl+'/buscar-disponiveis').pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPermissoesDisponiveisDefensor(): Observable<PermissaoModelo[]> {
    return this.http.get<PermissaoModelo[]>(this.baseUrl+'/buscar-disponiveis-defensor').pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPermissoesDisponiveisAlteracao(numeroPermissao: string): Observable<PermissaoModelo[]> {
    return this.http.get<PermissaoModelo[]>(this.baseUrl+'/buscar-disponiveis/'+numeroPermissao).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPermissoesDisponiveisAlteracaoDefensor(numeroPermissao: string): Observable<PermissaoModelo[]> {
    return this.http.get<PermissaoModelo[]>(this.baseUrl+'/buscar-disponiveis-defensor/'+numeroPermissao).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarTodasPermissoes(pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);
    return this.http.get<PageModelo>(this.baseUrl+'/buscar-todos', {params}).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPermissaoComFiltros(permissao: PermissaoModelo, pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    if (permissao.numeroPermissao)       {  params = params.set('numeroPermissao', permissao.numeroPermissao); }
    if (permissao.numeroAlvara)       {  params = params.set('numeroAlvara', permissao.numeroAlvara); }
    if (permissao.anoPermissao)       {  params = params.set('anoAlvara', permissao.anoPermissao); }
    if (permissao.statusPermissao)       {  params = params.set('statusPermissao', permissao.statusPermissao); }
    if (permissao.periodoInicialStatus)       {  params = params.set('periodoInicialStatus', permissao.periodoInicialStatus); }
    if (permissao.periodoFinalStatus)       {  params = params.set('periodoFinalStatus', permissao.periodoFinalStatus); }
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);

    return this.http.get<PageModelo>(this.baseUrl+'/buscar-filtros', {params}).pipe(catchError(this.errorHandler)); // catch error
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
