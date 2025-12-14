import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {PermissionarioModelo} from "../components/permissionario/permissionario-modelo.model";
import {PermissionarioFiltro} from "../components/permissionario/permissionario-filtro.model";

@Injectable({
  providedIn: 'root'
})

export class PermissionarioService {

  snackBar = inject(MatSnackBar);
  baseUrl = "http://localhost:9190/permissionario";
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

  inserirPermissionario(permissionario: PermissionarioModelo, certidaoNegativaCriminalFile: File | null,
                        certidaoNegativaMunicipalFile: File | null, fotoFile: File | null): Observable<PermissionarioModelo>{
    const formDataPermissionario = new FormData();
    const jsonString = '{"idPermissionario": null, "numeroPermissao": "' + permissionario.numeroPermissao + '"' +
      ', "nomePermissionario": "' + permissionario.nomePermissionario + '"' +
      ', "cpfPermissionario": "' + permissionario.cpfPermissionario + '"' +
      ', "cnpjEmpresa": "' + permissionario.cnpjEmpresa + '"' +
      ', "rgPermissionario": "' + permissionario.rgPermissionario + '"' +
      ', "orgaoEmissor": "' + permissionario.orgaoEmissor + '"' +
      ', "naturezaPessoa": "' + permissionario.naturezaPessoa + '"' +
      ', "cnhPermissionario": "' + permissionario.cnhPermissionario + '"' +
      ', "ufPermissionario": "' + permissionario.ufPermissionario + '"' +
      ', "bairroPermissionario": "' + permissionario.bairroPermissionario + '"' +
      ', "enderecoPermissionario": "' + permissionario.enderecoPermissionario + '"' +
      ', "celularPermissionario": "' + permissionario.celularPermissionario + '"' +
      ', "numeroQuitacaoMilitar": "' + permissionario.numeroQuitacaoMilitar + '"' +
      ', "numeroQuitacaoEleitoral": "' + permissionario.numeroQuitacaoEleitoral + '"' +
      ', "numeroInscricaoInss": "' + permissionario.numeroInscricaoInss + '"' +
      ', "numeroCertificadoCondutor": "' + permissionario.numeroCertificadoCondutor + '"' +
      ', "usuario": "' + permissionario.usuario + '"}'
    // @ts-ignore
    formDataPermissionario.append('permissionario', jsonString);
    // @ts-ignore
    formDataPermissionario.append('certidaoNegativaCriminal', certidaoNegativaCriminalFile, certidaoNegativaCriminalFile.name);
    // @ts-ignore
    formDataPermissionario.append('certidaoNegativaMunicipal', certidaoNegativaMunicipalFile, certidaoNegativaMunicipalFile.name);
    // @ts-ignore
    formDataPermissionario.append('foto', fotoFile, fotoFile.name);
    return this.http.post<PermissionarioModelo>(this.baseUrl+'/inserir', formDataPermissionario).pipe(catchError(this.errorHandlerInserir));
  }

  editarPermissionario(permissionario: PermissionarioModelo, certidaoNegativaCriminalFile: File | null,
                       certidaoNegativaMunicipalFile: File | null, fotoFile: File | null): Observable<PermissionarioModelo>{
    const formDataPermissionario = new FormData();
    const jsonString = '{"idPermissionario": "' + permissionario.idPermissionario + '"' +
      ', "numeroPermissao": "' + permissionario.numeroPermissao + '"' +
      ', "nomePermissionario": "' + permissionario.nomePermissionario + '"' +
      ', "cpfPermissionario": "' + permissionario.cpfPermissionario + '"' +
      ', "cnpjEmpresa": "' + permissionario.cnpjEmpresa + '"' +
      ', "rgPermissionario": "' + permissionario.rgPermissionario + '"' +
      ', "orgaoEmissor": "' + permissionario.orgaoEmissor + '"' +
      ', "naturezaPessoa": "' + permissionario.naturezaPessoa + '"' +
      ', "cnhPermissionario": "' + permissionario.cnhPermissionario + '"' +
      ', "categoriaCnhPermissionario": "' + permissionario.categoriaCnhPermissionario + '"' +
      ', "ufPermissionario": "' + permissionario.ufPermissionario + '"' +
      ', "bairroPermissionario": "' + permissionario.bairroPermissionario + '"' +
      ', "enderecoPermissionario": "' + permissionario.enderecoPermissionario + '"' +
      ', "celularPermissionario": "' + permissionario.celularPermissionario + '"' +
      ', "numeroQuitacaoMilitar": "' + permissionario.numeroQuitacaoMilitar + '"' +
      ', "numeroQuitacaoEleitoral": "' + permissionario.numeroQuitacaoEleitoral + '"' +
      ', "numeroInscricaoInss": "' + permissionario.numeroInscricaoInss + '"' +
      ', "numeroCertificadoCondutor": "' + permissionario.numeroCertificadoCondutor + '"' +
      ', "usuario": "' + permissionario.usuario + '"}'
    // @ts-ignore
    formDataPermissionario.append('permissionario', jsonString);
    if(certidaoNegativaCriminalFile != null)
      // @ts-ignore
      formDataPermissionario.append('certidaoNegativaCriminal', certidaoNegativaCriminalFile, certidaoNegativaCriminalFile.name);
    if(certidaoNegativaMunicipalFile != null)
      // @ts-ignore
      formDataPermissionario.append('certidaoNegativaMunicipalFile', certidaoNegativaMunicipalFile, certidaoNegativaMunicipalFile.name);
    if(fotoFile != null)
      // @ts-ignore
      formDataPermissionario.append('fotoFile', certidaoNegativaCriminalFile, fotoFile.name);
    return this.http.post<PermissionarioModelo>(this.baseUrl+'/alterar', formDataPermissionario).pipe(catchError(this.errorHandlerInserir));
  }

  excluirPermissionario(idPermissionario: number, usuario: string): Observable<String>{
    this.erroMetodo = "Não foi possível excluir o Permissionário!";
    return this.http.delete<String>(this.baseUrl+'/excluir/'+idPermissionario+'/usuario/'+usuario).pipe(catchError(this.errorHandlerExcluir));
  }

  consultarTodosPermissionarios(): Observable<PermissionarioModelo[]> {
    return this.http.get<PermissionarioModelo[]>(this.baseUrl+'/buscar-todos').pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPermissionariosDisponiveis(): Observable<PermissionarioModelo[]> {
    return this.http.get<PermissionarioModelo[]>(this.baseUrl+'/buscar-disponiveis').pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPermissionariosDisponiveisAlteracao(idPermissionario: number): Observable<PermissionarioModelo[]> {
    return this.http.get<PermissionarioModelo[]>(this.baseUrl+'/buscar-disponiveis/'+idPermissionario).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPontosTaxiComFiltros(permissionario: PermissionarioFiltro): Observable<PermissionarioModelo[]> {
    let params = new HttpParams();
    if (permissionario.numeroPermissao)       {  params = params.set('numeroPermissao', permissionario.numeroPermissao); }
    if (permissionario.nomePermissionario)       {  params = params.set('nomePermissionario', permissionario.nomePermissionario); }
    if (permissionario.cpfPermissionario)       {  params = params.set('cpfPermissionario', permissionario.cpfPermissionario); }
    if (permissionario.cnpjEmpresa)       {  params = params.set('cnpjEmpresa', permissionario.cnpjEmpresa); }
    if (permissionario.cnhPermissionario)       {  params = params.set('cnhPermissionario', permissionario.cnhPermissionario); }

    return this.http.get<PermissionarioModelo[]>(this.baseUrl+'/buscar-filtros', {params}).pipe(catchError(this.errorHandler)); // catch error
  }

  consultarPermissionarioId(permissionario: PermissionarioFiltro): Observable<PermissionarioModelo> {
    return this.http.get<PermissionarioModelo>(this.baseUrl+'/buscar/?idPermissionario='+permissionario.idPermissionario).pipe(catchError(this.errorHandler)); // catch error
  }

  errorHandlerAlterar() {
    return throwError("Ocorreu um erro ao Alterar o Permissionário!");
  }

  errorHandlerInserir() {
    return throwError("Ocorreu um erro ao Inserir o Permissionário!");
  }

  errorHandlerExcluir() {
    return throwError("Ocorreu um erro ao Excluir o Permissionário!");
  }

  errorHandler() {
    return throwError("Ocorreu um erro! Operação não concluída!");
  }
}
