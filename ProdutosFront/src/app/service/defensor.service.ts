import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {DefensorModelo} from "../components/defensor/defensor-modelo.model";
import {DefensorFiltro} from "../components/defensor/defensor-filtro.model";
import {PageModelo} from "../components/comum/page-modelo.model";

@Injectable({
  providedIn: 'root'
})

export class DefensorService {

  snackBar = inject(MatSnackBar);
  baseUrl = "http://localhost:9190/defensor";
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

  inserirDefensor(defensor: DefensorModelo, certidaoNegativaCriminalFile: File | null,
                        certidaoNegativaMunicipalFile: File | null, fotoFile: File | null): Observable<DefensorModelo>{
    const formDataDefensor = new FormData();
    const jsonString = '{"idDefensor": null, "numeroPermissao": "' + defensor.numeroPermissao + '"' +
      ', "nomeDefensor": "' + defensor.nomeDefensor + '"' +
      ', "cpfDefensor": "' + defensor.cpfDefensor + '"' +
      ', "cnpjEmpresa": "' + defensor.cnpjEmpresa + '"' +
      ', "rgDefensor": "' + defensor.rgDefensor + '"' +
      ', "orgaoEmissor": "' + defensor.orgaoEmissor + '"' +
      ', "naturezaPessoa": "' + defensor.naturezaPessoa + '"' +
      ', "cnhDefensor": "' + defensor.cnhDefensor + '"' +
      ', "categoriaCnhDefensor": "' + defensor.categoriaCnhDefensor + '"' +
      ', "ufDefensor": "' + defensor.ufDefensor + '"' +
      ', "bairroDefensor": "' + defensor.bairroDefensor + '"' +
      ', "enderecoDefensor": "' + defensor.enderecoDefensor + '"' +
      ', "celularDefensor": "' + defensor.celularDefensor + '"' +
      ', "numeroQuitacaoMilitar": "' + defensor.numeroQuitacaoMilitar + '"' +
      ', "numeroQuitacaoEleitoral": "' + defensor.numeroQuitacaoEleitoral + '"' +
      ', "numeroInscricaoInss": "' + defensor.numeroInscricaoInss + '"' +
      ', "numeroCertificadoCondutor": "' + defensor.numeroCertificadoCondutor + '"' +
      ', "usuario": "' + defensor.usuario + '"}'
    // @ts-ignore
    formDataDefensor.append('defensor', jsonString);
    // @ts-ignore
    formDataDefensor.append('certidaoNegativaCriminal', certidaoNegativaCriminalFile, certidaoNegativaCriminalFile.name);
    // @ts-ignore
    formDataDefensor.append('certidaoNegativaMunicipal', certidaoNegativaMunicipalFile, certidaoNegativaMunicipalFile.name);
    // @ts-ignore
    formDataDefensor.append('foto', fotoFile, fotoFile.name);
    return this.http.post<DefensorModelo>(this.baseUrl+'/inserir', formDataDefensor).pipe(catchError(this.errorHandler));
  }

  editarDefensor(defensor: DefensorModelo, certidaoNegativaCriminalFile: File | null,
                       certidaoNegativaMunicipalFile: File | null, fotoFile: File | null): Observable<DefensorModelo>{
    const formDataDefensor = new FormData();
    const jsonString = '{"idDefensor": "' + defensor.idDefensor + '"' +
      ', "numeroPermissao": "' + defensor.numeroPermissao + '"' +
      ', "nomeDefensor": "' + defensor.nomeDefensor + '"' +
      ', "cpfDefensor": "' + defensor.cpfDefensor + '"' +
      ', "cnpjEmpresa": "' + defensor.cnpjEmpresa + '"' +
      ', "rgDefensor": "' + defensor.rgDefensor + '"' +
      ', "orgaoEmissor": "' + defensor.orgaoEmissor + '"' +
      ', "naturezaPessoa": "' + defensor.naturezaPessoa + '"' +
      ', "cnhDefensor": "' + defensor.cnhDefensor + '"' +
      ', "categoriaCnhDefensor": "' + defensor.categoriaCnhDefensor + '"' +
      ', "ufDefensor": "' + defensor.ufDefensor + '"' +
      ', "bairroDefensor": "' + defensor.bairroDefensor + '"' +
      ', "enderecoDefensor": "' + defensor.enderecoDefensor + '"' +
      ', "celularDefensor": "' + defensor.celularDefensor + '"' +
      ', "numeroQuitacaoMilitar": "' + defensor.numeroQuitacaoMilitar + '"' +
      ', "numeroQuitacaoEleitoral": "' + defensor.numeroQuitacaoEleitoral + '"' +
      ', "numeroInscricaoInss": "' + defensor.numeroInscricaoInss + '"' +
      ', "numeroCertificadoCondutor": "' + defensor.numeroCertificadoCondutor + '"' +
      ', "usuario": "' + defensor.usuario + '"}'
    // @ts-ignore
    formDataDefensor.append('defensor', jsonString);
    if(certidaoNegativaCriminalFile != null)
      // @ts-ignore
      formDataDefensor.append('certidaoNegativaCriminal', certidaoNegativaCriminalFile, certidaoNegativaCriminalFile.name);
    if(certidaoNegativaMunicipalFile != null)
      // @ts-ignore
      formDataDefensor.append('certidaoNegativaMunicipalFile', certidaoNegativaMunicipalFile, certidaoNegativaMunicipalFile.name);
    if(fotoFile != null)
      // @ts-ignore
      formDataDefensor.append('fotoFile', certidaoNegativaCriminalFile, fotoFile.name);
    return this.http.post<DefensorModelo>(this.baseUrl+'/alterar', formDataDefensor).pipe(catchError(this.errorHandler));
  }

  excluirDefensor(idDefensor: number, usuario: string): Observable<String>{
    this.erroMetodo = "Não foi possível excluir o Defensor!";
    return this.http.delete<String>(this.baseUrl+'/excluir/'+idDefensor+'/usuario/'+usuario).pipe(catchError(this.errorHandler));
  }

  consultarTodosDefensores(pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);
    return this.http.get<PageModelo>(this.baseUrl+'/buscar-todos', {params}).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarDefensorsDisponiveis(): Observable<DefensorModelo[]> {
    return this.http.get<DefensorModelo[]>(this.baseUrl+'/buscar-disponiveis').pipe(catchError(this.errorHandler));  // catch error
  }

  consultarDefensorsDisponiveisAlteracao(idDefensor: number): Observable<DefensorModelo[]> {
    return this.http.get<DefensorModelo[]>(this.baseUrl+'/buscar-disponiveis/'+idDefensor).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarDefensoresComFiltros(defensor: DefensorFiltro, pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    if (defensor.numeroPermissao)       {  params = params.set('numeroPermissao', defensor.numeroPermissao); }
    if (defensor.nomeDefensor)       {  params = params.set('nomeDefensor', defensor.nomeDefensor); }
    if (defensor.cpfDefensor)       {  params = params.set('cpfDefensor', defensor.cpfDefensor); }
    if (defensor.cnpjEmpresa)       {  params = params.set('cnpjEmpresa', defensor.cnpjEmpresa); }
    if (defensor.cnhDefensor)       {  params = params.set('cnhDefensor', defensor.cnhDefensor); }
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);

    return this.http.get<PageModelo>(this.baseUrl+'/buscar-filtros', {params}).pipe(catchError(this.errorHandler)); // catch error
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }

}
