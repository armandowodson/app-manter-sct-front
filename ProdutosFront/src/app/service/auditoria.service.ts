import { HttpClient, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuditoriaFiltro} from "../components/auditoria/auditoria-filtro.model";
import {PageModelo} from "../components/comum/page-modelo.model";

@Injectable({
  providedIn: 'root'
})

export class AuditoriaService {

  snackBar = inject(MatSnackBar);
  baseUrl = "http://localhost:9190/auditoria";
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

  consultarTodasAuditorias(pageIndex: number, pageSize: number): Observable<PageModelo> {
      let params = new HttpParams();
      params = params.set('pageIndex', pageIndex);
      params = params.set('pageSize', pageSize);
      return this.http.get<PageModelo>(this.baseUrl+'/buscar-todas', {params}).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarAuditoriaComFiltros(auditoria: AuditoriaFiltro, pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    if (auditoria.nomeModulo)       {  params = params.set('nomeModulo', auditoria.nomeModulo); }
    if (auditoria.usuarioOperacao)       {  params = params.set('usuarioOperacao', auditoria.usuarioOperacao); }
    if (auditoria.operacao)       {  params = params.set('operacao', auditoria.operacao); }
    if (auditoria.dataInicioOperacao)       {  params = params.set('dataInicioOperacao', auditoria.dataInicioOperacao); }
    if (auditoria.dataFimOperacao)       {  params = params.set('dataFimOperacao', auditoria.dataFimOperacao); }
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);

    return this.http.get<PageModelo>(this.baseUrl+'/buscar-filtros', {params}).pipe(catchError(this.errorHandler)); // catch error
  }

  imprimirAuditoria(auditoria: AuditoriaFiltro, pageIndex: number, pageSize: number): Observable<PageModelo[]> {
    let params = new HttpParams();
    if (auditoria.nomeModulo)       {  params = params.set('nomeModulo', auditoria.nomeModulo); }
    if (auditoria.usuarioOperacao)       {  params = params.set('usuarioOperacao', auditoria.usuarioOperacao); }
    if (auditoria.operacao)       {  params = params.set('operacao', auditoria.operacao); }
    if (auditoria.dataInicioOperacao)       {  params = params.set('dataInicioOperacao', auditoria.dataInicioOperacao); }
    if (auditoria.dataFimOperacao)       {  params = params.set('dataFimOperacao', auditoria.dataFimOperacao); }
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);

    return this.http.get<PageModelo[]>(this.baseUrl+'/imprimir', {params}).pipe(catchError(this.errorHandler)); // catch error
  }

  errorHandler() {
    return throwError("Ocorreu um erro! Operação não concluída!");
  }
}
