import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {VeiculoModelo} from "../components/veiculo/veiculo-modelo.model";
import {VeiculoFiltro} from "../components/veiculo/veiculo-filtro.model";
import {PageModelo} from "../components/comum/page-modelo.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class VeiculoService {

  snackBar = inject(MatSnackBar);
  baseUrl = environment.urlAplicacao+"/veiculo";
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

  inserirVeiculo(veiculo: VeiculoModelo, crlv: File | null, comprovanteVistoria: File | null): Observable<VeiculoModelo>{
    const formDataVeiculo = new FormData();
    const jsonString = '{"idVeiculo": null, "idPermissionario": "' + veiculo.idPermissionario + '"' +
      ', "numeroPermissao": "' + veiculo.numeroPermissao + '"' +
      ', "idPontoTaxi": "' + veiculo.idPontoTaxi + '"' +
      ', "placa": "' + veiculo.placa + '"' +
      ', "renavam": "' + veiculo.renavam + '"' +
      ', "chassi": "' + veiculo.chassi + '"' +
      ', "anoFabricacao": "' + veiculo.anoFabricacao + '"' +
      ', "marca": "' + veiculo.marca + '"' +
      ', "modelo": "' + veiculo.modelo + '"' +
      ', "anoModelo": "' + veiculo.anoModelo + '"' +
      ', "cor": "' + veiculo.cor + '"' +
      ', "combustivel": "' + veiculo.combustivel + '"' +
      ', "numeroTaximetro": "' + veiculo.numeroTaximetro + '"' +
      ', "anoRenovacao": "' + veiculo.anoRenovacao + '"' +
      ', "dataVistoria": "' + veiculo.dataVistoria + '"' +
      ', "dataRetorno": "' + veiculo.dataRetorno + '"' +
      ', "situacaoVeiculo": "' + veiculo.situacaoVeiculo + '"' +
      ', "numeroCrlv": "' + veiculo.numeroCrlv + '"' +
      ', "anoCrlv": "' + veiculo.anoCrlv + '"' +
      ', "certificadoAfericao": "' + veiculo.certificadoAfericao + '"' +
      ', "tipoVeiculo": "' + veiculo.tipoVeiculo + '"' +
      ', "observacao": "' + veiculo.observacao + '"' +
      ', "usuario": "' + veiculo.usuario + '"}'
    // @ts-ignore
    formDataVeiculo.append('veiculo', jsonString);
    // @ts-ignore
    formDataVeiculo.append('crlv', crlv, crlv.name);
    // @ts-ignore
    formDataVeiculo.append('comprovanteVistoria', comprovanteVistoria, comprovanteVistoria.name);
    return this.http.post<VeiculoModelo>(this.baseUrl+'/inserir', formDataVeiculo).pipe(catchError(this.errorHandler));
  }

  editarVeiculo(veiculo: VeiculoModelo, crlv: File | null, comprovanteVistoria: File | null): Observable<VeiculoModelo>{
    const formDataVeiculo = new FormData();
    const jsonString = '{"idVeiculo": "' + veiculo.idVeiculo + '"' +
      ', "idPermissionario": "' + veiculo.idPermissionario + '"' +
      ', "numeroPermissao": "' + veiculo.numeroPermissao + '"' +
      ', "idPontoTaxi": "' + veiculo.idPontoTaxi + '"' +
      ', "placa": "' + veiculo.placa + '"' +
      ', "renavam": "' + veiculo.renavam + '"' +
      ', "chassi": "' + veiculo.chassi + '"' +
      ', "anoFabricacao": "' + veiculo.anoFabricacao + '"' +
      ', "marca": "' + veiculo.marca + '"' +
      ', "modelo": "' + veiculo.modelo + '"' +
      ', "anoModelo": "' + veiculo.anoModelo + '"' +
      ', "cor": "' + veiculo.cor + '"' +
      ', "combustivel": "' + veiculo.combustivel + '"' +
      ', "numeroTaximetro": "' + veiculo.numeroTaximetro + '"' +
      ', "anoRenovacao": "' + veiculo.anoRenovacao + '"' +
      ', "dataVistoria": "' + veiculo.dataVistoria + '"' +
      ', "dataRetorno": "' + veiculo.dataRetorno + '"' +
      ', "situacaoVeiculo": "' + veiculo.situacaoVeiculo + '"' +
      ', "numeroCrlv": "' + veiculo.numeroCrlv + '"' +
      ', "anoCrlv": "' + veiculo.anoCrlv + '"' +
      ', "certificadoAfericao": "' + veiculo.certificadoAfericao + '"' +
      ', "tipoVeiculo": "' + veiculo.tipoVeiculo + '"' +
      ', "observacao": "' + veiculo.observacao + '"' +
      ', "usuario": "' + veiculo.usuario + '"}'
    // @ts-ignore
    formDataVeiculo.append('veiculo', jsonString);
    if(crlv != null)
      // @ts-ignore
      formDataVeiculo.append('crlv', crlv, crlv.name);
    if(comprovanteVistoria != null)
      // @ts-ignore
      formDataVeiculo.append('comprovanteVistoria', comprovanteVistoria, comprovanteVistoria.name);
    return this.http.post<VeiculoModelo>(this.baseUrl+'/alterar', formDataVeiculo).pipe(catchError(this.errorHandler));
  }

  buscarVeiculoPlaca(placa: string): Observable<PageModelo>{
    let params = new HttpParams();
    params = params.set('placa', placa);
    return this.http.get<PageModelo>(this.baseUrl+'/buscar-veiculo', {params}).pipe(catchError(this.errorHandler));  // catch error
  }

  excluirVeiculo(idVeiculo: number, usuario: string): Observable<String>{
    this.erroMetodo = "Não foi possível excluir o Veículo!";
    return this.http.delete<String>(this.baseUrl+'/excluir/'+idVeiculo+'/usuario/'+usuario).pipe(catchError(this.errorHandler));
  }

  consultarTodosVeiculos(pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);
    return this.http.get<PageModelo>(this.baseUrl+'/buscar-todos', {params}).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarVeiculosComFiltros(veiculo: VeiculoFiltro, pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    if (veiculo.numeroPermissao)       {  params = params.set('numeroPermissao', veiculo.numeroPermissao); }
    if (veiculo.placa)       {  params = params.set('placa', veiculo.placa); }
    if (veiculo.renavam)       {  params = params.set('renavam', veiculo.renavam); }
    if (veiculo.numeroTaximetro)       {  params = params.set('numeroTaximetro', veiculo.numeroTaximetro); }
    if (veiculo.anoFabricacao)       {  params = params.set('anoFabricacao', veiculo.anoFabricacao); }
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);

    return this.http.get<PageModelo>(this.baseUrl+'/buscar-filtros', {params}).pipe(catchError(this.errorHandler)); // catch error
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
