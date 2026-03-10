import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {VistoriaModelo} from "../components/vistoria/vistoria-modelo.model";
import {VistoriaFiltro} from "../components/vistoria/vistoria-filtro.model";
import {PageModelo} from "../components/comum/page-modelo.model";
import {environment} from "../../environments/environment";
import {PermissaoModelo} from "../components/permissao/permissao.model";

@Injectable({
  providedIn: 'root'
})

export class VistoriaService {

  snackBar = inject(MatSnackBar);
  baseUrl = environment.urlAplicacao+"/vistoria";
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

  inserirVistoria(vistoria: VistoriaModelo, comprovanteVistoria: File | null): Observable<VistoriaModelo>{
    const formDataVistoria = new FormData();
    const jsonString = '{"idVistoria": null, "idVeiculo": "' + vistoria.idVeiculo + '"' +
      ', "chassiFunilariaPintura": "' + vistoria.chassiFunilariaPintura + '"' +
      ', "instalacaoEletrica": "' + vistoria.instalacaoEletrica + '"' +
      ', "farolAtlaBaixa": "' + vistoria.farolAtlaBaixa + '"' +
      ', "buzina": "' + vistoria.buzina + '"' +
      ', "lanternaTraseira": "' + vistoria.lanternaTraseira + '"' +
      ', "freioDianteiro": "' + vistoria.freioDianteiro + '"' +
      ', "luzPlaca": "' + vistoria.luzPlaca + '"' +
      ', "freioTraseiro": "' + vistoria.freioTraseiro + '"' +
      ', "luzesDirecao": "' + vistoria.luzesDirecao + '"' +
      ', "pneusDesgateCalibragem": "' + vistoria.pneusDesgateCalibragem + '"' +
      ', "luzFreio": "' + vistoria.luzFreio + '"' +
      ', "correnteCorreia": "' + vistoria.correnteCorreia + '"' +
      ', "placasDianteiraTraseira": "' + vistoria.placasDianteiraTraseira + '"' +
      ', "vazamentoOleoCombustivel": "' + vistoria.vazamentoOleoCombustivel + '"' +
      ', "limpezaGeralInterna": "' + vistoria.limpezaGeralInterna + '"' +
      ', "escapamento": "' + vistoria.escapamento + '"' +
      ', "assentoFixacao": "' + vistoria.assentoFixacao + '"' +
      ', "equipamentosObrigatorios": "' + vistoria.equipamentosObrigatorios + '"' +
      ', "espelhosRetrovisores": "' + vistoria.espelhosRetrovisores + '"' +
      ', "selosVistoria": "' + vistoria.selosVistoria + '"' +
      ', "guidaoManoplas": "' + vistoria.guidaoManoplas + '"' +
      ', "outros": "' + vistoria.outros + '"' +
      ', "dataVistoria": "' + vistoria.dataVistoria + '"' +
      ', "dataRetorno": "' + vistoria.dataRetorno + '"' +
      ', "statusVistoria": "' + vistoria.statusVistoria + '"' +
      ', "ressalvas": "' + vistoria.ressalvas + '"' +
      ', "observacao": "' + vistoria.observacao + '"' +
      ', "usuario": "' + vistoria.usuario + '"}'
    // @ts-ignore
    formDataVistoria.append('vistoria', jsonString);
    // @ts-ignore
    formDataVistoria.append('comprovanteVistoria', comprovanteVistoria, comprovanteVistoria.name);
    return this.http.post<VistoriaModelo>(this.baseUrl+'/inserir', formDataVistoria).pipe(catchError(this.errorHandler));
  }

  editarVistoria(vistoria: VistoriaModelo, comprovanteVistoria: File | null): Observable<VistoriaModelo>{
    const formDataVistoria = new FormData();
    const jsonString = '{"idVistoria": "' + vistoria.idVistoria + '"' +
      ', "idVeiculo": "' + vistoria.idVeiculo + '"' +
      ', "chassiFunilariaPintura": "' + vistoria.chassiFunilariaPintura + '"' +
      ', "instalacaoEletrica": "' + vistoria.instalacaoEletrica + '"' +
      ', "farolAtlaBaixa": "' + vistoria.farolAtlaBaixa + '"' +
      ', "buzina": "' + vistoria.buzina + '"' +
      ', "lanternaTraseira": "' + vistoria.lanternaTraseira + '"' +
      ', "freioDianteiro": "' + vistoria.freioDianteiro + '"' +
      ', "luzPlaca": "' + vistoria.luzPlaca + '"' +
      ', "freioTraseiro": "' + vistoria.freioTraseiro + '"' +
      ', "luzesDirecao": "' + vistoria.luzesDirecao + '"' +
      ', "pneusDesgateCalibragem": "' + vistoria.pneusDesgateCalibragem + '"' +
      ', "luzFreio": "' + vistoria.luzFreio + '"' +
      ', "correnteCorreia": "' + vistoria.correnteCorreia + '"' +
      ', "placasDianteiraTraseira": "' + vistoria.placasDianteiraTraseira + '"' +
      ', "vazamentoOleoCombustivel": "' + vistoria.vazamentoOleoCombustivel + '"' +
      ', "limpezaGeralInterna": "' + vistoria.limpezaGeralInterna + '"' +
      ', "escapamento": "' + vistoria.escapamento + '"' +
      ', "assentoFixacao": "' + vistoria.assentoFixacao + '"' +
      ', "equipamentosObrigatorios": "' + vistoria.equipamentosObrigatorios + '"' +
      ', "espelhosRetrovisores": "' + vistoria.espelhosRetrovisores + '"' +
      ', "selosVistoria": "' + vistoria.selosVistoria + '"' +
      ', "guidaoManoplas": "' + vistoria.guidaoManoplas + '"' +
      ', "outros": "' + vistoria.outros + '"' +
      ', "dataVistoria": "' + vistoria.dataVistoria + '"' +
      ', "dataRetorno": "' + vistoria.dataRetorno + '"' +
      ', "statusVistoria": "' + vistoria.statusVistoria + '"' +
      ', "ressalvas": "' + vistoria.ressalvas + '"' +
      ', "observacao": "' + vistoria.observacao + '"' +
      ', "usuario": "' + vistoria.usuario + '"}'
    // @ts-ignore
    formDataVistoria.append('vistoria', jsonString);
    if(comprovanteVistoria != null)
      // @ts-ignore
      formDataVistoria.append('comprovanteVistoria', comprovanteVistoria, comprovanteVistoria.name);
    return this.http.post<VistoriaModelo>(this.baseUrl+'/alterar', formDataVistoria).pipe(catchError(this.errorHandler));
  }

  excluirVistoria(idVistoria: number, usuario: string): Observable<String>{
    this.erroMetodo = "Não foi possível excluir o Laudo de Vistoria!";
    return this.http.delete<String>(this.baseUrl+'/excluir/'+idVistoria+'/usuario/'+usuario).pipe(catchError(this.errorHandler));
  }

  consultarTodasVistorias(pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);
    return this.http.get<PageModelo>(this.baseUrl+'/buscar-todos', {params}).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarVistoriasComFiltros(vistoria: VistoriaFiltro, pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    if (vistoria.numeroPermissao)       {  params = params.set('numeroPermissao', vistoria.numeroPermissao); }
    if (vistoria.placa)       {  params = params.set('placa', vistoria.placa); }
    if (vistoria.statusVistoria)       {  params = params.set('statusVistoria', vistoria.statusVistoria); }
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);

    return this.http.get<PageModelo>(this.baseUrl+'/buscar-filtros', {params}).pipe(catchError(this.errorHandler)); // catch error
  }

  gerarLaudoVistoria(vistoriaSelecionada: VistoriaModelo, modulo : number): Observable<ArrayBuffer> {
    let params = new HttpParams();
    params = params.set('idVistoria', vistoriaSelecionada.idVistoria);
    params = params.set('idVeiculo', vistoriaSelecionada.idVeiculo);
    params = params.set('modulo', modulo);

    return this.http.get(this.baseUrl+'/gerar-laudo-vistoria', {responseType: 'arraybuffer', params}).pipe(catchError(this.errorHandlerGerarLaudoVistoria)); // catch error
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }

  errorHandlerGerarLaudoVistoria(error: HttpErrorResponse) {
    var msgErro = '';
    if (error.status == 400){
      msgErro = 'Não é possível emitir o Laudo de Vistoria! Não há Veículo associado ao Laudo!';
    }
    if (error.status == 401){
      msgErro = 'Não é possível emitir o Laudo de Vistoria. Não há Termo de Autoriazação associado ao Veículo do Laudo!';
    }
    if (error.status == 402){
      msgErro = 'Não é possível emitir o Laudo de Vistoria! Não há Autorizatário associado ao Veículo do Laudo!';
    }
    if (error.status == 500){
      msgErro = 'Ocorreu um erro! Não foi possível gerar o Laudo de Vistoria!';
    }

    return throwError(() => new Error(msgErro));
  }
}
