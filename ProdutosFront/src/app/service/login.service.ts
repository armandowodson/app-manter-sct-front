import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { Product } from '../../app/components/product/product.model';
import { catchError } from 'rxjs/operators';
import {Login} from "../components/template/login/login.model";
import {Registro} from "../components/template/registro/registro.model";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  baseUrl = "http://localhost:9190/login";
  snackBar = inject(MatSnackBar);

  constructor(private http: HttpClient, handler: HttpBackend) { }
  efetuarLogin(login: Login): Observable<Login> {
    return this.http.get<Login>(this.baseUrl+'/conectar?usuario='+login.usuario+'&senha='+login.senha).pipe(catchError(this.errorHandler)); // catch error
  }

  registrarLogin(registro: Registro): Observable<Registro> {
    return this.http.post<Registro>(this.baseUrl+'/gravar', registro).pipe(catchError(this.errorHandlerInserir));
  }

  public showMessageSuccess(message: string) {
    let config = this.configurarSnackBar('success-snackbar');
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

  errorHandler() {
    return throwError("Usuário e/ou Senha Inválidos!");
  }

  public showMessageError(message: string) {
    let config = this.configurarSnackBar('error-snackbar');
    this.snackBar.open(message, 'X', config);
  }

  errorHandlerInserir() {
    return throwError("Ocorreu um erro ao Inserir o Usuário!");
  }
}
