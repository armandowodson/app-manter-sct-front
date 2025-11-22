import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import {LoginComponent} from "./components/template/login/login.component";
import {RegistroComponent} from "./components/template/registro/registro.component";
import {LogoutComponent} from "./components/template/logout/logout.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductCrudComponent
  },
  {
    path: "products/create",
    component: ProductCreateComponent
  },
  {
    path: "products/edit",
    component: ProductEditComponent
  },
  {
    path: "logar",
    component: LoginComponent
  },
  {
    path: "registrar",
    component: RegistroComponent
  },
  {
    path: "sair",
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
