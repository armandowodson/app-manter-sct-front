import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {DefensorModelo} from "../components/defensor/defensor-modelo.model";
import {DefensorFiltro} from "../components/defensor/defensor-filtro.model";
import {PageModelo} from "../components/comum/page-modelo.model";
import {PermissionarioModelo} from "../components/permissionario/permissionario-modelo.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class DefensorService {

  snackBar = inject(MatSnackBar);
  baseUrl = environment.urlAplicacao+"/defensor";
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

  inserirDefensor(defensor: DefensorModelo, anexoRgFile: File | null, anexoCpfFile: File | null, anexoCnhFile: File | null,
                  comprovanteResidenciaFile: File | null, certidaoNegativaMunicipalFile: File | null, certidaoNegativaCriminalFile: File | null,
                  certificadoPropriedadeFile : File | null, certificadoCondutorFile: File | null, apoliceSeguroVidaFile : File | null,
                  apoliceSeguroMotocicletaFile : File | null, fotoFile: File | null): Observable<DefensorModelo>{
    const formDataDefensor = new FormData();
    if(defensor.filiacaoPai == null || defensor.filiacaoPai == "null")
      defensor.filiacaoPai = "";
    if(defensor.estadoCivil == null || defensor.estadoCivil == "null")
      defensor.estadoCivil = "";
    if(defensor.emailDefensor == null || defensor.emailDefensor == "null")
      defensor.emailDefensor = "";
    if(defensor.numeroInscricaoInss == null || defensor.numeroInscricaoInss == "null")
      defensor.numeroInscricaoInss = "";
    if(defensor.numeroQuitacaoMilitar == null || defensor.numeroQuitacaoMilitar == "null")
      defensor.numeroQuitacaoMilitar = "";
    if(defensor.numeroQuitacaoEleitoral == null || defensor.numeroQuitacaoEleitoral == "null")
      defensor.numeroQuitacaoEleitoral = "";
    const jsonString = '{"idDefensor": null, "idPermissionario": "' + defensor.idPermissionario + '"' +
      ', "nomeDefensor": "' + defensor.nomeDefensor + '"' +
      ', "cpfDefensor": "' + defensor.cpfDefensor + '"' +
      ', "rgDefensor": "' + defensor.rgDefensor + '"' +
      ', "orgaoEmissor": "' + defensor.orgaoEmissor + '"' +
      ', "filiacaoMae": "' + defensor.filiacaoMae + '"' +
      ', "filiacaoPai": "' + defensor.filiacaoPai + '"' +
      ', "sexo": "' + defensor.sexo + '"' +
      ', "estadoCivil": "' + defensor.estadoCivil + '"' +
      ', "dataNascimento": "' + defensor.dataNascimento + '"' +
      ', "cnhDefensor": "' + defensor.cnhDefensor + '"' +
      ', "categoriaCnhDefensor": "' + defensor.categoriaCnhDefensor + '"' +
      ', "dataValidadeCnh": "' + defensor.dataValidadeCnh + '"' +
      ', "ufDefensor": "' + defensor.ufDefensor + '"' +
      ', "cidadeDefensor": "' + defensor.cidadeDefensor + '"' +
      ', "bairroDefensor": "' + defensor.bairroDefensor + '"' +
      ', "enderecoDefensor": "' + defensor.enderecoDefensor + '"' +
      ', "cep": "' + defensor.cep + '"' +
      ', "celularDefensor": "' + defensor.celularDefensor + '"' +
      ', "emailDefensor": "' + defensor.emailDefensor + '"' +
      ', "numeroQuitacaoMilitar": "' + defensor.numeroQuitacaoMilitar + '"' +
      ', "numeroQuitacaoEleitoral": "' + defensor.numeroQuitacaoEleitoral + '"' +
      ', "numeroInscricaoInss": "' + defensor.numeroInscricaoInss + '"' +
      ', "numeroCertificadoCondutor": "' + defensor.numeroCertificadoCondutor + '"' +
      ', "dataValidadeCertificadoCondutor": "' + defensor.dataValidadeCertificadoCondutor + '"' +
      ', "usuario": "' + defensor.usuario + '"}'
    // @ts-ignore
    formDataDefensor.append('defensor', jsonString);

    // @ts-ignore
    formDataDefensor.append('anexoRg', anexoRgFile, anexoRgFile.name);
    // @ts-ignore
    formDataDefensor.append('anexoCpf', anexoCpfFile, anexoCpfFile.name);
    // @ts-ignore
    formDataDefensor.append('anexoCnh', anexoCnhFile, anexoCnhFile.name);
    // @ts-ignore
    formDataDefensor.append('comprovanteResidencia', comprovanteResidenciaFile, comprovanteResidenciaFile.name);
    // @ts-ignore
    formDataDefensor.append('certidaoNegativaMunicipal', certidaoNegativaMunicipalFile, certidaoNegativaMunicipalFile.name);
    // @ts-ignore
    formDataDefensor.append('certidaoNegativaCriminal', certidaoNegativaCriminalFile, certidaoNegativaCriminalFile.name);
    // @ts-ignore
    formDataDefensor.append('certificadoPropriedade', certificadoPropriedadeFile, certificadoPropriedadeFile.name);
    // @ts-ignore
    formDataDefensor.append('certificadoCondutor', certificadoCondutorFile, certificadoCondutorFile.name);
    // @ts-ignore
    formDataDefensor.append('apoliceSeguroVida', apoliceSeguroVidaFile, apoliceSeguroVidaFile.name);
    // @ts-ignore
    formDataDefensor.append('apoliceSeguroMotocicleta', apoliceSeguroMotocicletaFile, apoliceSeguroMotocicletaFile.name);
    // @ts-ignore
    formDataDefensor.append('foto', fotoFile, fotoFile.name);
    return this.http.post<DefensorModelo>(this.baseUrl+'/inserir', formDataDefensor).pipe(catchError(this.errorHandler));
  }

  editarDefensor(defensor: DefensorModelo, anexoRgFile: File | null, anexoCpfFile: File | null, anexoCnhFile: File | null,
                 comprovanteResidenciaFile: File | null, certidaoNegativaMunicipalFile: File | null, certidaoNegativaCriminalFile: File | null,
                 certificadoPropriedadeFile : File | null, certificadoCondutorFile: File | null, apoliceSeguroVidaFile : File | null,
                 apoliceSeguroMotocicletaFile : File | null, fotoFile: File | null, eventDataNascimento: Date,
                 eventDataValidadeCnh: Date): Observable<DefensorModelo>{

    const selectedDataNascimento = eventDataNascimento;
    var dataNascimento: string | null = '';
    if(selectedDataNascimento != null){
      dataNascimento = selectedDataNascimento ? selectedDataNascimento.toLocaleDateString('en-CA') : null;
      if(dataNascimento != null){
        defensor.dataNascimento = dataNascimento;
      }
    }

    const selectedDataValidadeCnh = eventDataValidadeCnh;
    var dataValidadeCnh: string | null = '';
    if(selectedDataValidadeCnh != null){
      dataValidadeCnh = selectedDataValidadeCnh ? selectedDataValidadeCnh.toLocaleDateString('en-CA') : null;
      if(dataValidadeCnh != null){
        defensor.dataValidadeCnh = dataValidadeCnh;
      }
    }

    const formDataDefensor = new FormData();
    if(defensor.filiacaoPai == null || defensor.filiacaoPai == "null")
      defensor.filiacaoPai = "";
    if(defensor.estadoCivil == null || defensor.estadoCivil == "null")
      defensor.estadoCivil = "";
    if(defensor.emailDefensor == null || defensor.emailDefensor == "null")
      defensor.emailDefensor = "";
    if(defensor.numeroInscricaoInss == null || defensor.numeroInscricaoInss == "null")
      defensor.numeroInscricaoInss = "";
    if(defensor.numeroQuitacaoMilitar == null || defensor.numeroQuitacaoMilitar == "null")
      defensor.numeroQuitacaoMilitar = "";
    if(defensor.numeroQuitacaoEleitoral == null || defensor.numeroQuitacaoEleitoral == "null")
      defensor.numeroQuitacaoEleitoral = "";
    const jsonString = '{"idDefensor": "' + defensor.idDefensor + '"' +
      ', "idPermissionario": "' + defensor.idPermissionario + '"' +
      ', "nomeDefensor": "' + defensor.nomeDefensor + '"' +
      ', "cpfDefensor": "' + defensor.cpfDefensor + '"' +
      ', "rgDefensor": "' + defensor.rgDefensor + '"' +
      ', "orgaoEmissor": "' + defensor.orgaoEmissor + '"' +
      ', "filiacaoMae": "' + defensor.filiacaoMae + '"' +
      ', "filiacaoPai": "' + defensor.filiacaoPai + '"' +
      ', "sexo": "' + defensor.sexo + '"' +
      ', "estadoCivil": "' + defensor.estadoCivil + '"' +
      ', "dataNascimento": "' + defensor.dataNascimento + '"' +
      ', "cnhDefensor": "' + defensor.cnhDefensor + '"' +
      ', "categoriaCnhDefensor": "' + defensor.categoriaCnhDefensor + '"' +
      ', "dataValidadeCnh": "' + defensor.dataValidadeCnh + '"' +
      ', "ufDefensor": "' + defensor.ufDefensor + '"' +
      ', "cidadeDefensor": "' + defensor.cidadeDefensor + '"' +
      ', "bairroDefensor": "' + defensor.bairroDefensor + '"' +
      ', "enderecoDefensor": "' + defensor.enderecoDefensor + '"' +
      ', "cep": "' + defensor.cep + '"' +
      ', "celularDefensor": "' + defensor.celularDefensor + '"' +
      ', "emailDefensor": "' + defensor.emailDefensor + '"' +
      ', "numeroQuitacaoMilitar": "' + defensor.numeroQuitacaoMilitar + '"' +
      ', "numeroQuitacaoEleitoral": "' + defensor.numeroQuitacaoEleitoral + '"' +
      ', "numeroInscricaoInss": "' + defensor.numeroInscricaoInss + '"' +
      ', "numeroCertificadoCondutor": "' + defensor.numeroCertificadoCondutor + '"' +
      ', "dataValidadeCertificadoCondutor": "' + defensor.dataValidadeCertificadoCondutor + '"' +
      ', "usuario": "' + defensor.usuario + '"}'
    // @ts-ignore
    formDataDefensor.append('defensor', jsonString);

    if(anexoRgFile != null)
      // @ts-ignore
      formDataDefensor.append('anexoRg', anexoRgFile, anexoRgFile.name);
    if (anexoCpfFile != null)
      // @ts-ignore
      formDataDefensor.append('anexoCpf', anexoCpfFile, anexoCpfFile.name);
    if (anexoCnhFile != null)
      // @ts-ignore
      formDataDefensor.append('anexoCnh', anexoCnhFile, anexoCnhFile.name);
    if (comprovanteResidenciaFile != null)
      // @ts-ignore
      formDataDefensor.append('comprovanteResidencia', comprovanteResidenciaFile, comprovanteResidenciaFile.name);
    if(certidaoNegativaMunicipalFile != null)
      // @ts-ignore
      formDataDefensor.append('certidaoNegativaMunicipal', certidaoNegativaMunicipalFile, certidaoNegativaMunicipalFile.name);
    if(certidaoNegativaCriminalFile != null)
      // @ts-ignore
      formDataDefensor.append('certidaoNegativaCriminal', certidaoNegativaCriminalFile, certidaoNegativaCriminalFile.name);
    if(certificadoPropriedadeFile != null)
      // @ts-ignore
      formDataDefensor.append('certificadoPropriedade', certificadoPropriedadeFile, certificadoPropriedadeFile.name);
    if(certificadoCondutorFile != null)
      // @ts-ignore
      formDataDefensor.append('certificadoCondutor', certificadoCondutorFile, certificadoCondutorFile.name);
    if(apoliceSeguroVidaFile != null)
      // @ts-ignore
      formDataDefensor.append('apoliceSeguroVida', apoliceSeguroVidaFile, apoliceSeguroVidaFile.name);
    if(apoliceSeguroMotocicletaFile != null)
      // @ts-ignore
      formDataDefensor.append('apoliceSeguroMotocicleta', apoliceSeguroMotocicletaFile, apoliceSeguroMotocicletaFile.name);
    if(fotoFile != null)
      // @ts-ignore
      formDataDefensor.append('foto', fotoFile, fotoFile.name);
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

  consultarDefensorNumeroPermissao(numeroPermissao: string): Observable<DefensorModelo> {
    return this.http.get<DefensorModelo>(this.baseUrl+'/buscar-permissao/'+numeroPermissao).pipe(catchError(this.errorHandler)); // catch error
  }

  consultarDefensoresComFiltros(defensor: DefensorFiltro, pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    if (defensor.nomeDefensor)       {  params = params.set('nomeDefensor', defensor.nomeDefensor); }
    if (defensor.cpfDefensor)       {  params = params.set('cpfDefensor', defensor.cpfDefensor); }
    if (defensor.cnhDefensor)       {  params = params.set('cnhDefensor', defensor.cnhDefensor); }
    if (defensor.nomePermissionario)       {  params = params.set('nomePermissionario', defensor.nomePermissionario); }
    if (defensor.cpfPermissionario)       {  params = params.set('cpfPermissionario', defensor.cpfPermissionario); }
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);

    return this.http.get<PageModelo>(this.baseUrl+'/buscar-filtros', {params}).pipe(catchError(this.errorHandler)); // catch error
  }
  gerarRegistroCondutor(idPermissionario: string, modulo: number): Observable<ArrayBuffer> {
    let params = new HttpParams();
    params = params.set('idPermissionario', idPermissionario);
    params = params.set('modulo', modulo);

    return this.http.get(this.baseUrl+'/gerar-registro-condutor', {responseType: 'arraybuffer', params}).pipe(catchError(this.errorHandlerGerarRegistroCondutor)); // catch error
  }

  errorHandler(error: any) {
    return throwError(() => new Error(error.error.message));
  }

  errorHandlerGerarRegistroCondutor(error: HttpErrorResponse) {
    var msgErro = '';
    if (error.status == 400){
      msgErro = 'Não é possível emitir o Registro do Condutor! Não há Termo de Autorização de Serviço!';
    }
    if (error.status == 401){
      msgErro = 'Não é possível emitir o Registro do Condutor! Não há Veículo associado ao Termo de Autorização de Serviço!';
    }
    if (error.status == 402){
      msgErro = 'Não é possível emitir o Registro do Condutor! Não há Defensor associado ao Veículo!';
    }
    if (error.status == 500){
      msgErro = 'Ocorreu um erro! Não foi possível gerar o Registro do Condutor!';
    }

    return throwError(() => new Error(msgErro));
  }

}
