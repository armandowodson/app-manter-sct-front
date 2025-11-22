import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "../../../service/product.service";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ModalComponent } from "../../modal-component/modal.component";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
})
export class ProductReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  NODE_TLS_REJECT_UNAUTHORIZED = 0;
  public loading = false;

  product: Product = {
    idproduto: 0,
    nome: "",
    descricao: "",
    preco: 0,
    situacao: 0,
  };

  products: Product[] = [];
  displayedColumns = ["idproduto", "nome", "descricao", "preco", "situacao", "acoes"];
  tamanho: number;
  errors: string;
  nome: string;
  descricao: string;
  page: number = 1;
  contador: number = 5;
  valorFormatado: string | null;
  sinal: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    public matDialog: MatDialog
  ) {
    this.tamanho = 0;
    this.errors = "";
    this.nome = "";
    this.descricao = "";
    this.product.situacao = 0;
    this.valorFormatado = "";
    this.sinal = "";
  }

  ngOnInit(): void {
    this.productService.consultarTodosProdutos(this.product).subscribe(
      (products) => {
        if (products.length == 0) {
          this.productService.showMessageAlert(
            "A consulta não retornou resultado!"
          );
        }
        this.products = products;
        this.tamanho = this.products.length;
      },
      (error) => {
        this.errors = error;
        this.productService.showMessageError(this.errors);
      }
    );
  }

  transformarMoeda(element: FocusEvent) {
    var numeroOracle = "";

    if (this.valorFormatado != null) {
      numeroOracle = this.valorFormatado.replace("R$", "");
      numeroOracle = numeroOracle.replace(".", "");
      numeroOracle = numeroOracle.replace(",", ".");
    }
    this.valorFormatado = this.currencyPipe.transform(
      numeroOracle,
      "R$",
      "symbol",
      "1.2-2"
    );
    console.log("transformarMoeda: " + this.valorFormatado);

    //element.target.value = this.valorFormatado;
  }

  navegarVoltarPaginaInicial(): void {
    this.router.navigate(["/"]);
  }

  navegarInserirProduto(): void {
    this.router.navigate(["products/create"]);
  }

  navegarEditarProduto(produtoSelecionado: Product): void {
    this.router.navigate(['products/edit/'], { state: {data: produtoSelecionado} });
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  consultarProdutosComFiltros() {
    this.loading = true;
    var numeroOracle = "";
    if (this.valorFormatado != null && this.valorFormatado != "") {
      numeroOracle = this.valorFormatado.replace("R$", "");
      numeroOracle = numeroOracle.replace(".", "").trim();
      numeroOracle = numeroOracle.replace(",", ".");
      this.product.preco = parseFloat(numeroOracle);
    } else {
      this.product.preco = 0;
    }

    console.log("SINAL & PREÇO: " + this.sinal + "-" + this.product.preco);
    if (this.sinal != "" && this.product.preco == 0) {
      this.productService.showMessageAlert(
        "Ao informar o Sinal é necessário informar o Preço!"
      );
      return;
    }

    if (this.sinal == "" && this.product.preco != 0) {
      this.productService.showMessageAlert(
        "Ao informar o Preço é necessário informar o Sinal!"
      );
      return;
    }

    this.productService
      .consultarProdutosComFiltros(this.product, this.sinal)
      .subscribe(
        (products) => {
          if (products.length == 0) {
            this.productService.showMessageAlert(
              "A consulta não retornou resultado!"
            );
          }
          this.products = products;
          this.tamanho = this.products.length;
          this.loading = false;
        },
        (error) => {
          this.errors = error;
          this.productService.showMessageError(this.errors);
          this.loading = false;
        }
      );
  }

  confirmarExclusao(message?: string) {
    return new Promise((resolve) => {
      return resolve(window.confirm(message || "Confirma ?"));
    });
  }

  openModal(idproduto: number, nome: string) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id =
      "Deseja excluir o produto: " + idproduto + " - " + nome + " ?";
    dialogConfig.panelClass = "dialogModal";
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  excluirProduto(idproduto: number) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].idproduto == idproduto) {
        this.nome = this.products[i].nome;
        i = this.products.length;
      }
    }
    this.confirmarExclusao(
      "Deseja excluir o produto: " + idproduto + ": " + this.nome + " ?"
    ).then((podeDeletar) => {
      if (podeDeletar) {
        this.productService.excluirProduto(idproduto).subscribe(() => {
            this.productService.showMessageSuccess("Produto Excluído com Sucesso!!!");
            this.router.navigate(['/products']);
          },
          (error) => {
            this.errors = error;
            this.productService.showMessageError(this.errors);
          }
        );
      }
    });
  }

  getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
}
