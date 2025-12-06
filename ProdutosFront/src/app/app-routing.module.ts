import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './views/home/home.component';
import { PontoTaxiCrudComponent } from './views/ponto-taxi-crud/ponto-taxi-crud.component';
import {LoginComponent} from "./components/template/login/login.component";
import {RegistroComponent} from "./components/template/registro/registro.component";
import {LogoutComponent} from "./components/template/logout/logout.component";
import {PontoTaxiCreateComponent} from "./components/pontos-taxi/ponto-taxi-create/ponto-taxi-create.component";
import {PontoTaxiEditComponent} from "./components/pontos-taxi/ponto-taxi-edit/ponto-taxi-edit.component";
import {PrincipalComponent} from "./components/template/principal/principal.component";
import {PermissionarioCrudComponent} from "./views/permissionario-crud/permissionario-crud.component";
import {
  PermissionarioCreateComponent
} from "./components/permissionario/permissionario-create/permissionario-create.component";
import {
  PermissionarioEditComponent
} from "./components/permissionario/permissionario-edit/permissionario-edit.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "ponto-taxi",
    component: PontoTaxiCrudComponent
  },
  {
    path: "ponto-taxi/create",
    component: PontoTaxiCreateComponent
  },
  {
    path: "ponto-taxi/edit",
    component: PontoTaxiEditComponent
  },
  {
    path: "permissionario",
    component: PermissionarioCrudComponent
  },
  {
    path: "permissionario/create",
    component: PermissionarioCreateComponent
  },
  {
    path: "permissionario/edit",
    component: PermissionarioEditComponent
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
    path: "principal",
    component: PrincipalComponent
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
