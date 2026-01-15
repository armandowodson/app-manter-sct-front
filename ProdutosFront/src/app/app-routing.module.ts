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
import {PermissionarioCreateComponent} from "./components/permissionario/permissionario-create/permissionario-create.component";
import {PermissionarioEditComponent} from "./components/permissionario/permissionario-edit/permissionario-edit.component";
import {DefensorCrudComponent} from "./views/defensor-crud/defensor-crud.component";
import {DefensorCreateComponent} from "./components/defensor/defensor-create/defensor-create.component";
import {DefensorEditComponent} from "./components/defensor/defensor-edit/defensor-edit.component";
import {VeiculoCrudComponent} from "./views/veiculo-crud/veiculo-crud.component";
import {VeiculoCreateComponent} from "./components/veiculo/veiculo-create/veiculo-create.component";
import {VeiculoEditComponent} from "./components/veiculo/veiculo-edit/veiculo-edit.component";
import {AuditoriaCrudComponent} from "./views/auditoria-crud/auditoria-crud.component";
import {PermissaoCrudComponent} from "./views/permissao-crud/permissao-crud.component";
import {PermissaoCreateComponent} from "./components/permissao/permissao-create/permissao-create.component";
import {PermissaoEditComponent} from "./components/permissao/permissao-edit/permissao-edit.component";
import {FiscalizacaoCrudComponent} from "./views/fiscalizacao-crud/fiscalizacao-crud.component";
import {FiscalizacaoCreateComponent} from "./components/fiscalizacao/fiscalizacao-create/fiscalizacao-create.component";
import {FiscalizacaoEditComponent} from "./components/fiscalizacao/fiscalizacao-edit/fiscalizacao-edit.component";

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
    path: "defensor",
    component: DefensorCrudComponent
  },
  {
    path: "defensor/create",
    component: DefensorCreateComponent
  },
  {
    path: "defensor/edit",
    component: DefensorEditComponent
  },
  {
    path: "veiculo",
    component: VeiculoCrudComponent
  },
  {
    path: "veiculo/create",
    component: VeiculoCreateComponent
  },
  {
    path: "veiculo/edit",
    component: VeiculoEditComponent
  },
  {
    path: "permissao",
    component: PermissaoCrudComponent
  },
  {
    path: "permissao/create",
    component: PermissaoCreateComponent
  },
  {
    path: "permissao/edit",
    component: PermissaoEditComponent
  },
  {
    path: "fiscalizacao",
    component: FiscalizacaoCrudComponent
  },
  {
    path: "fiscalizacao/create",
    component: FiscalizacaoCreateComponent
  },
  {
    path: "fiscalizacao/edit",
    component: FiscalizacaoEditComponent
  },
  {
    path: "auditoria",
    component: AuditoriaCrudComponent
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
