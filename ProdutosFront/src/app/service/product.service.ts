import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpBackend, HttpParams } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { Product } from '../../app/components/product/product.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  snackBar = inject(MatSnackBar);
  baseUrl = "http://localhost:9190/produto";
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
  inserirProduto(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product).pipe(catchError(this.errorHandlerInserir));
  }

  editarProduto(product: Product): Observable<Product>{
    return this.http.put<Product>(this.baseUrl, product).pipe(catchError(this.errorHandlerAlterar));
  }

  excluirProduto(idproduto: number): Observable<String>{
    this.erroMetodo = "Não foi possível excluir o produto!";
    return this.http.delete<String>(this.baseUrl+'/id/?idProduto='+idproduto).pipe(catchError(this.errorHandlerExcluir));
  }

  consultarTodosProdutos(product: Product): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(catchError(this.errorHandler));  // catch error
  }

  consultarProdutosComFiltros(product: Product, sinal: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl+'/filtros/?nome='+product.nome+'&sinal='+sinal+'&preco='+product.preco+'&situacao='+product.situacao).pipe(catchError(this.errorHandler)); // catch error
  }

  consultarProdutoPeloID(product: Product): Observable<Product> {
    return this.http.get<Product>(this.baseUrl+'/id/?idProduto='+product.idproduto).pipe(catchError(this.errorHandler)); // catch error
  }

  errorHandlerAlterar() {
    return throwError("Ocorreu um erro ao Alterar o produto!");
  }

  errorHandlerInserir() {
    return throwError("Ocorreu um erro ao Inserir o produto!");
  }

  errorHandlerExcluir() {
    return throwError("Ocorreu um erro ao Excluir o produto!");
  }

  errorHandler() {
    return throwError("Ocorreu um erro! Operação não concluída!");
  }
}
