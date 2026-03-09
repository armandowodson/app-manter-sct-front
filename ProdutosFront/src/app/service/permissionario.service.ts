import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {PermissionarioModelo} from "../components/permissionario/permissionario-modelo.model";
import {PermissionarioFiltro} from "../components/permissionario/permissionario-filtro.model";
import {PageModelo} from "../components/comum/page-modelo.model";
import {environment} from "../../environments/environment";
import {PermissaoModelo} from "../components/permissao/permissao.model";

@Injectable({
  providedIn: 'root'
})

export class PermissionarioService {

  snackBar = inject(MatSnackBar);
  baseUrl = environment.urlAplicacao+"/permissionario";
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

  inserirPermissionario(permissionario: PermissionarioModelo, anexoRgFile: File | null, anexoCpfFile: File | null, anexoCnhFile: File | null,
                        comprovanteResidenciaFile: File | null, certidaoNegativaMunicipalFile: File | null, certidaoNegativaCriminalFile: File | null,
                        certificadoPropriedadeFile : File | null, certificadoCondutorFile: File | null, apoliceSeguroVidaFile : File | null,
                        apoliceSeguroMotocicletaFile : File | null, fotoFile: File | null): Observable<PermissionarioModelo>{
    const formDataPermissionario = new FormData();
    if(permissionario.filiacaoPai == null || permissionario.filiacaoPai == "null")
      permissionario.filiacaoPai = "";
    if(permissionario.estadoCivil == null || permissionario.estadoCivil == "null")
      permissionario.estadoCivil = "";
    if(permissionario.emailPermissionario == null || permissionario.emailPermissionario == "null")
      permissionario.emailPermissionario = "";
    if(permissionario.numeroInscricaoInss == null || permissionario.numeroInscricaoInss == "null")
      permissionario.numeroInscricaoInss = "";
    if(permissionario.numeroQuitacaoMilitar == null || permissionario.numeroQuitacaoMilitar == "null")
      permissionario.numeroQuitacaoMilitar = "";
    if(permissionario.numeroQuitacaoEleitoral == null || permissionario.numeroQuitacaoEleitoral == "null")
      permissionario.numeroQuitacaoEleitoral = "";
    const jsonString = '{"idPermissionario": null, "numeroPermissao": "' + permissionario.numeroPermissao + '"' +
      ', "nomePermissionario": "' + permissionario.nomePermissionario + '"' +
      ', "cpfPermissionario": "' + permissionario.cpfPermissionario + '"' +
      ', "rgPermissionario": "' + permissionario.rgPermissionario + '"' +
      ', "orgaoEmissor": "' + permissionario.orgaoEmissor + '"' +
      ', "filiacaoMae": "' + permissionario.filiacaoMae + '"' +
      ', "filiacaoPai": "' + permissionario.filiacaoPai + '"' +
      ', "sexo": "' + permissionario.sexo + '"' +
      ', "estadoCivil": "' + permissionario.estadoCivil + '"' +
      ', "dataNascimento": "' + permissionario.dataNascimento + '"' +
      ', "cnhPermissionario": "' + permissionario.cnhPermissionario + '"' +
      ', "categoriaCnhPermissionario": "' + permissionario.categoriaCnhPermissionario + '"' +
      ', "dataValidadeCnh": "' + permissionario.dataValidadeCnh + '"' +
      ', "ufPermissionario": "' + permissionario.ufPermissionario + '"' +
      ', "cidadePermissionario": "' + permissionario.cidadePermissionario + '"' +
      ', "bairroPermissionario": "' + permissionario.bairroPermissionario + '"' +
      ', "enderecoPermissionario": "' + permissionario.enderecoPermissionario + '"' +
      ', "cep": "' + permissionario.cep + '"' +
      ', "celularPermissionario": "' + permissionario.celularPermissionario + '"' +
      ', "emailPermissionario": "' + permissionario.emailPermissionario + '"' +
      ', "numeroQuitacaoMilitar": "' + permissionario.numeroQuitacaoMilitar + '"' +
      ', "numeroQuitacaoEleitoral": "' + permissionario.numeroQuitacaoEleitoral + '"' +
      ', "numeroInscricaoInss": "' + permissionario.numeroInscricaoInss + '"' +
      ', "numeroCertificadoCondutor": "' + permissionario.numeroCertificadoCondutor + '"' +
      ', "dataValidadeCertificadoCondutor": "' + permissionario.dataValidadeCertificadoCondutor + '"' +
      ', "aplicativoAlternativo": "' + permissionario.aplicativoAlternativo + '"' +
      ', "observacao": "' + permissionario.observacao + '"' +
      ', "usuario": "' + permissionario.usuario + '"}'
    // @ts-ignore
    formDataPermissionario.append('permissionario', jsonString);

    // @ts-ignore
    formDataPermissionario.append('anexoRg', anexoRgFile, anexoRgFile.name);
    // @ts-ignore
    formDataPermissionario.append('anexoCpf', anexoCpfFile, anexoCpfFile.name);
    // @ts-ignore
    formDataPermissionario.append('anexoCnh', anexoCnhFile, anexoCnhFile.name);
    // @ts-ignore
    formDataPermissionario.append('comprovanteResidencia', comprovanteResidenciaFile, comprovanteResidenciaFile.name);
    // @ts-ignore
    formDataPermissionario.append('certidaoNegativaMunicipal', certidaoNegativaMunicipalFile, certidaoNegativaMunicipalFile.name);
    // @ts-ignore
    formDataPermissionario.append('certidaoNegativaCriminal', certidaoNegativaCriminalFile, certidaoNegativaCriminalFile.name);
    // @ts-ignore
    formDataPermissionario.append('certificadoPropriedade', certificadoPropriedadeFile, certificadoPropriedadeFile.name);
    // @ts-ignore
    formDataPermissionario.append('certificadoCondutor', certificadoCondutorFile, certificadoCondutorFile.name);
    // @ts-ignore
    formDataPermissionario.append('apoliceSeguroVida', apoliceSeguroVidaFile, apoliceSeguroVidaFile.name);
    // @ts-ignore
    formDataPermissionario.append('apoliceSeguroMotocicleta', apoliceSeguroMotocicletaFile, apoliceSeguroMotocicletaFile.name);
    // @ts-ignore
    formDataPermissionario.append('foto', fotoFile, fotoFile.name);
    return this.http.post<PermissionarioModelo>(this.baseUrl+'/inserir', formDataPermissionario).pipe(catchError(this.errorHandler));
  }

  editarPermissionario(permissionario: PermissionarioModelo, anexoRgFile: File | null, anexoCpfFile: File | null, anexoCnhFile: File | null,
                       comprovanteResidenciaFile: File | null, certidaoNegativaMunicipalFile: File | null, certidaoNegativaCriminalFile: File | null,
                       certificadoPropriedadeFile : File | null, certificadoCondutorFile: File | null, apoliceSeguroVidaFile : File | null,
                       apoliceSeguroMotocicletaFile : File | null, fotoFile: File | null): Observable<PermissionarioModelo>{
    const formDataPermissionario = new FormData();
    if(permissionario.filiacaoPai == null || permissionario.filiacaoPai == "null")
      permissionario.filiacaoPai = "";
    if(permissionario.estadoCivil == null || permissionario.estadoCivil == "null")
      permissionario.estadoCivil = "";
    if(permissionario.emailPermissionario == null || permissionario.emailPermissionario == "null")
      permissionario.emailPermissionario = "";
    if(permissionario.numeroInscricaoInss == null || permissionario.numeroInscricaoInss == "null")
      permissionario.numeroInscricaoInss = "";
    if(permissionario.numeroQuitacaoMilitar == null || permissionario.numeroQuitacaoMilitar == "null")
      permissionario.numeroQuitacaoMilitar = "";
    if(permissionario.numeroQuitacaoEleitoral == null || permissionario.numeroQuitacaoEleitoral == "null")
      permissionario.numeroQuitacaoEleitoral = "";

    const jsonString = '{"idPermissionario": "' + permissionario.idPermissionario + '"' +
      ', "numeroPermissao": "' + permissionario.numeroPermissao + '"' +
      ', "nomePermissionario": "' + permissionario.nomePermissionario + '"' +
      ', "cpfPermissionario": "' + permissionario.cpfPermissionario + '"' +
      ', "rgPermissionario": "' + permissionario.rgPermissionario + '"' +
      ', "orgaoEmissor": "' + permissionario.orgaoEmissor + '"' +
      ', "filiacaoMae": "' + permissionario.filiacaoMae + '"' +
      ', "filiacaoPai": "' + permissionario.filiacaoPai + '"' +
      ', "sexo": "' + permissionario.sexo + '"' +
      ', "estadoCivil": "' + permissionario.estadoCivil + '"' +
      ', "dataNascimento": "' + permissionario.dataNascimento + '"' +
      ', "cnhPermissionario": "' + permissionario.cnhPermissionario + '"' +
      ', "categoriaCnhPermissionario": "' + permissionario.categoriaCnhPermissionario + '"' +
      ', "dataValidadeCnh": "' + permissionario.dataValidadeCnh + '"' +
      ', "ufPermissionario": "' + permissionario.ufPermissionario + '"' +
      ', "cidadePermissionario": "' + permissionario.cidadePermissionario + '"' +
      ', "bairroPermissionario": "' + permissionario.bairroPermissionario + '"' +
      ', "enderecoPermissionario": "' + permissionario.enderecoPermissionario + '"' +
      ', "cep": "' + permissionario.cep + '"' +
      ', "celularPermissionario": "' + permissionario.celularPermissionario + '"' +
      ', "emailPermissionario": "' + permissionario.emailPermissionario + '"' +
      ', "numeroQuitacaoMilitar": "' + permissionario.numeroQuitacaoMilitar + '"' +
      ', "numeroQuitacaoEleitoral": "' + permissionario.numeroQuitacaoEleitoral + '"' +
      ', "numeroInscricaoInss": "' + permissionario.numeroInscricaoInss + '"' +
      ', "numeroCertificadoCondutor": "' + permissionario.numeroCertificadoCondutor + '"' +
      ', "dataValidadeCertificadoCondutor": "' + permissionario.dataValidadeCertificadoCondutor + '"' +
      ', "aplicativoAlternativo": "' + permissionario.aplicativoAlternativo + '"' +
      ', "observacao": "' + permissionario.observacao + '"' +
      ', "usuario": "' + permissionario.usuario + '"}'
    // @ts-ignore
    formDataPermissionario.append('permissionario', jsonString);

    if(anexoRgFile != null)
      // @ts-ignore
      formDataPermissionario.append('anexoRg', anexoRgFile, anexoRgFile.name);
    if (anexoCpfFile != null)
      // @ts-ignore
      formDataPermissionario.append('anexoCpf', anexoCpfFile, anexoCpfFile.name);
    if (anexoCnhFile != null)
      // @ts-ignore
      formDataPermissionario.append('anexoCnh', anexoCnhFile, anexoCnhFile.name);
    if (comprovanteResidenciaFile != null)
      // @ts-ignore
      formDataPermissionario.append('comprovanteResidencia', comprovanteResidenciaFile, comprovanteResidenciaFile.name);
    if(certidaoNegativaMunicipalFile != null)
      // @ts-ignore
      formDataPermissionario.append('certidaoNegativaMunicipal', certidaoNegativaMunicipalFile, certidaoNegativaMunicipalFile.name);
    if(certidaoNegativaCriminalFile != null)
      // @ts-ignore
      formDataPermissionario.append('certidaoNegativaCriminal', certidaoNegativaCriminalFile, certidaoNegativaCriminalFile.name);
    if(certificadoPropriedadeFile != null)
      // @ts-ignore
      formDataPermissionario.append('certificadoPropriedade', certificadoPropriedadeFile, certificadoPropriedadeFile.name);
    if(certificadoCondutorFile != null)
      // @ts-ignore
      formDataPermissionario.append('certificadoCondutor', certificadoCondutorFile, certificadoCondutorFile.name);
    if(apoliceSeguroVidaFile != null)
      // @ts-ignore
      formDataPermissionario.append('apoliceSeguroVida', apoliceSeguroVidaFile, apoliceSeguroVidaFile.name);
    if(apoliceSeguroMotocicletaFile != null)
      // @ts-ignore
      formDataPermissionario.append('apoliceSeguroMotocicleta', apoliceSeguroMotocicletaFile, apoliceSeguroMotocicletaFile.name);
    if(fotoFile != null)
      // @ts-ignore
      formDataPermissionario.append('foto', fotoFile, fotoFile.name);
    return this.http.post<PermissionarioModelo>(this.baseUrl+'/alterar', formDataPermissionario).pipe(catchError(this.errorHandler));
  }

  excluirPermissionario(idPermissionario: number, usuario: string): Observable<String>{
    this.erroMetodo = "Não foi possível excluir o Autorizatário!";
    return this.http.delete<String>(this.baseUrl+'/excluir/'+idPermissionario+'/usuario/'+usuario).pipe(catchError(this.errorHandler));
  }

  consultarTodosPermissionarios(pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);
    return this.http.get<PageModelo>(this.baseUrl+'/buscar-todos', {params}).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPermissionariosDisponiveis(): Observable<PermissionarioModelo[]> {
    return this.http.get<PermissionarioModelo[]>(this.baseUrl+'/buscar-disponiveis').pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPermissionariosDisponiveisAlteracao(idPermissionario: number): Observable<PermissionarioModelo[]> {
    return this.http.get<PermissionarioModelo[]>(this.baseUrl+'/buscar-disponiveis/'+idPermissionario).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarPontosTaxiComFiltros(permissionario: PermissionarioFiltro, pageIndex: number, pageSize: number): Observable<PageModelo> {
    let params = new HttpParams();
    if (permissionario.numeroPermissao)       {  params = params.set('numeroPermissao', permissionario.numeroPermissao); }
    if (permissionario.nomePermissionario)       {  params = params.set('nomePermissionario', permissionario.nomePermissionario); }
    if (permissionario.cpfPermissionario)       {  params = params.set('cpfPermissionario', permissionario.cpfPermissionario); }
    if (permissionario.cnhPermissionario)       {  params = params.set('cnhPermissionario', permissionario.cnhPermissionario); }
    params = params.set('pageIndex', pageIndex);
    params = params.set('pageSize', pageSize);

    return this.http.get<PageModelo>(this.baseUrl+'/buscar-filtros', {params}).pipe(catchError(this.errorHandler)); // catch error
  }

  consultarPermissionarioId(identificador: number): Observable<PermissionarioModelo> {
    return this.http.get<PermissionarioModelo>(this.baseUrl+'/buscar/'+identificador).pipe(catchError(this.errorHandler)); // catch error
  }

  gerarRegistroCondutor(numeroPermissao: string, modulo: number): Observable<ArrayBuffer> {
    let params = new HttpParams();
    params = params.set('numeroPermissao', numeroPermissao);
    params = params.set('modulo', modulo);

    return this.http.get(this.baseUrl+'/gerar-registro-condutor', {responseType: 'arraybuffer', params}).pipe(catchError(this.errorHandlerGerarAutorizacaoTrafego)); // catch error
  }

  errorHandler(error: any) {
    return throwError(() => new Error(error.error.message));
  }

  errorHandlerGerarAutorizacaoTrafego(error: HttpErrorResponse) {
    var msgErro = '';
    if (error.status == 400){
      msgErro = 'Não é possível emitir o Registro do Condutor! Não há Permissão para o ID informado!';
    }
    if (error.status == 401){
      msgErro = 'Não é possível emitir o Registro do Condutor! Não há Veículo associado à Permissão!';
    }
    if (error.status == 402){
      msgErro = 'Não é possível emitir o Registro do Condutor! Não há PET associado ao Veículo!';
    }
    if (error.status == 403){
      msgErro = 'Não é possível emitir o Registro do Condutor! Não há PET associado ao Veículo!';
    }
    if (error.status == 500){
      msgErro = 'Ocorreu um erro! Não foi possível gerar o Registro do Condutor!';
    }

    return throwError(() => new Error(msgErro));
  }
}
