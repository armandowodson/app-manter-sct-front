import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './views/home/home.component';
import { PontoTaxiCrudComponent } from './views/ponto-taxi-crud/ponto-taxi-crud.component';
import {LoginComponent} from "./components/template/login/login.component";
import {RegistroComponent} from "./components/template/registro/registro.component";
import {AlteraSenhaComponent} from "./components/template/altera-senha/altera-senha.component";
import {LogoutComponent} from "./components/template/logout/logout.component";
import {PontoTaxiCreateComponent} from "./components/pontos-taxi/ponto-taxi-create/ponto-taxi-create.component";
import {PontoTaxiEditComponent} from "./components/pontos-taxi/ponto-taxi-edit/ponto-taxi-edit.component";
import {PontoTaxiDetalheComponent} from "./components/pontos-taxi/ponto-taxi-detalhe/ponto-taxi-detalhe.component";
import {PrincipalComponent} from "./components/template/principal/principal.component";
import {PermissionarioCrudComponent} from "./views/permissionario-crud/permissionario-crud.component";
import {PermissionarioCreateComponent} from "./components/permissionario/permissionario-create/permissionario-create.component";
import {PermissionarioEditComponent} from "./components/permissionario/permissionario-edit/permissionario-edit.component";
import {PermissionarioDetalheComponent} from "./components/permissionario/permissionario-detalhe/permissionario-detalhe.component";
import {DefensorCrudComponent} from "./views/defensor-crud/defensor-crud.component";
import {DefensorCreateComponent} from "./components/defensor/defensor-create/defensor-create.component";
import {DefensorEditComponent} from "./components/defensor/defensor-edit/defensor-edit.component";
import {DefensorDetalheComponent} from "./components/defensor/defensor-detalhe/defensor-detalhe.component";
import {VeiculoCrudComponent} from "./views/veiculo-crud/veiculo-crud.component";
import {VeiculoCreateComponent} from "./components/veiculo/veiculo-create/veiculo-create.component";
import {VeiculoEditComponent} from "./components/veiculo/veiculo-edit/veiculo-edit.component";
import {AuditoriaCrudComponent} from "./views/auditoria-crud/auditoria-crud.component";
import {PermissaoCrudComponent} from "./views/permissao-crud/permissao-crud.component";
import {PermissaoCreateComponent} from "./components/permissao/permissao-create/permissao-create.component";
import {PermissaoEditComponent} from "./components/permissao/permissao-edit/permissao-edit.component";
import {PermissaoDetalheComponent} from "./components/permissao/permissao-detalhe/permissao-detalhe.component";
import {FiscalizacaoCrudComponent} from "./views/fiscalizacao-crud/fiscalizacao-crud.component";
import {FiscalizacaoCreateComponent} from "./components/fiscalizacao/fiscalizacao-create/fiscalizacao-create.component";
import {FiscalizacaoEditComponent} from "./components/fiscalizacao/fiscalizacao-edit/fiscalizacao-edit.component";
import {FiscalizacaoDetalheComponent} from "./components/fiscalizacao/fiscalizacao-detalhe/fiscalizacao-detalhe.component";
import {VeiculoDetalheComponent} from "./components/veiculo/veiculo-detalhe/veiculo-detalhe.component";
import {PermissaoRelatorioComponent} from "./components/permissao/permissao-relatorio/permissao-relatorio.component";
import {RelatorioCrudComponent} from "./views/relatorio-crud/relatorio-crud.component";

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
    path: "ponto-taxi/detalhe",
    component: PontoTaxiDetalheComponent
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
    path: "permissionario/detalhe",
    component: PermissionarioDetalheComponent
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
    path: "defensor/detalhe",
    component: DefensorDetalheComponent
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
    path: "veiculo/detalhe",
    component: VeiculoDetalheComponent
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
    path: "permissao/detalhe",
    component: PermissaoDetalheComponent
  },
  {
    path: "permissao/relatorio",
    component: PermissaoRelatorioComponent
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
    path: "fiscalizacao/detalhe",
    component: FiscalizacaoDetalheComponent
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
    path: "alterar-senha",
    component: AlteraSenhaComponent
  },
  {
    path: "principal",
    component: PrincipalComponent
  },
  {
    path: "relatorio",
    component: RelatorioCrudComponent
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
