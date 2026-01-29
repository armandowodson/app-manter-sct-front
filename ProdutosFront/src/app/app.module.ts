import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavComponent } from './components/template/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule} from '@angular/material/list';
import { HomeComponent } from './views/home/home.component';
import { RedDirective } from './directives/red.directive';
import { ForDirective } from './directives/for.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PontoTaxiCrudComponent } from './views/ponto-taxi-crud/ponto-taxi-crud.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';

import { CurrencyPipe} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatDialogModule } from '@angular/material/dialog';
import { PontoTaxiModalComponent } from './components/ponto-taxi-modal-component/ponto-taxi-modal.component';
import { PermissionarioModalComponent } from './components/permissionario-modal-component/permissionario-modal.component';
import { DefensorModalComponent } from './components/defensor-modal-component/defensor-modal.component';
import { VeiculoModalComponent } from './components/veiculo-modal-component/veiculo-modal.component';
import { PermissaoModalComponent } from './components/permissao-modal-component/permissao-modal.component';

import {LoginComponent} from "./components/template/login/login.component";
import {RegistroComponent} from "./components/template/registro/registro.component";
import {LogoutComponent} from "./components/template/logout/logout.component";
import {PrincipalComponent} from "./components/template/principal/principal.component";
import {PontoTaxiReadComponent} from "./components/pontos-taxi/ponto-taxi-read/ponto-taxi-read.component";
import {PontoTaxiCreateComponent} from "./components/pontos-taxi/ponto-taxi-create/ponto-taxi-create.component";
import {PontoTaxiEditComponent} from "./components/pontos-taxi/ponto-taxi-edit/ponto-taxi-edit.component";
import {PermissionarioReadComponent} from "./components/permissionario/permissionario-read/permissionario-read.component";
import {PermissionarioCrudComponent} from "./views/permissionario-crud/permissionario-crud.component";
import {PermissionarioCreateComponent} from "./components/permissionario/permissionario-create/permissionario-create.component";
import {PermissionarioEditComponent} from "./components/permissionario/permissionario-edit/permissionario-edit.component";
import {DefensorReadComponent} from "./components/defensor/defensor-read/defensor-read.component";
import {DefensorCrudComponent} from "./views/defensor-crud/defensor-crud.component";
import {DefensorCreateComponent} from "./components/defensor/defensor-create/defensor-create.component";
import {DefensorEditComponent} from "./components/defensor/defensor-edit/defensor-edit.component";
import {VeiculoReadComponent} from "./components/veiculo/veiculo-read/veiculo-read.component";
import {VeiculoCrudComponent} from "./views/veiculo-crud/veiculo-crud.component";
import {VeiculoCreateComponent} from "./components/veiculo/veiculo-create/veiculo-create.component";
import {VeiculoEditComponent} from "./components/veiculo/veiculo-edit/veiculo-edit.component";
import {PermissaoReadComponent} from "./components/permissao/permissao-read/permissao-read.component";
import {PermissaoEditComponent} from "./components/permissao/permissao-edit/permissao-edit.component";
import {PermissaoCreateComponent} from "./components/permissao/permissao-create/permissao-create.component";
import {PermissaoCrudComponent} from './views/permissao-crud/permissao-crud.component';
import {FiscalizacaoModalComponent} from "./components/fiscalizacao-modal-component/fiscalizacao-modal.component";
import {FiscalizacaoCrudComponent} from "./views/fiscalizacao-crud/fiscalizacao-crud.component";
import {FiscalizacaoReadComponent} from "./components/fiscalizacao/fiscalizacao-read/fiscalizacao-read.component";
import {FiscalizacaoCreateComponent} from "./components/fiscalizacao/fiscalizacao-create/fiscalizacao-create.component";
import {FiscalizacaoEditComponent} from "./components/fiscalizacao/fiscalizacao-edit/fiscalizacao-edit.component";
import {AuditoriaCrudComponent} from "./views/auditoria-crud/auditoria-crud.component";
import {AuditoriaReadComponent} from "./components/auditoria/auditoria-read/auditoria-read.component";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatMenuModule} from "@angular/material/menu";

registerLocaleData(localePt);

export const DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    PontoTaxiCrudComponent,
    RedDirective,
    ForDirective,
    PontoTaxiModalComponent,
    PermissionarioModalComponent,
    VeiculoModalComponent,
    DefensorModalComponent,
    PermissaoModalComponent,
    FiscalizacaoModalComponent,
    LoginComponent,
    RegistroComponent,
    LogoutComponent,
    PrincipalComponent,
    PontoTaxiReadComponent,
    PontoTaxiCreateComponent,
    PontoTaxiEditComponent,
    PermissionarioReadComponent,
    PermissionarioCrudComponent,
    PermissionarioCreateComponent,
    PermissionarioEditComponent,
    DefensorReadComponent,
    DefensorCrudComponent,
    DefensorCreateComponent,
    DefensorEditComponent,
    VeiculoReadComponent,
    VeiculoCrudComponent,
    VeiculoCreateComponent,
    VeiculoEditComponent,
    PermissaoReadComponent,
    PermissaoEditComponent,
    PermissaoCreateComponent,
    PermissaoCrudComponent,
    FiscalizacaoCrudComponent,
    FiscalizacaoReadComponent,
    FiscalizacaoEditComponent,
    FiscalizacaoCreateComponent,
    AuditoriaCrudComponent,
    AuditoriaReadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    NgxPaginationModule,
    NgbModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatMenuModule
  ],

  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },

    HttpClientModule,
    AppComponent,
    CurrencyPipe,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




