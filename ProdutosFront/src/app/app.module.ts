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
import { ModalComponent as ModalComponent } from './components/modal-component/modal.component';

import {LoginComponent} from "./components/template/login/login.component";
import {RegistroComponent} from "./components/template/registro/registro.component";
import {LogoutComponent} from "./components/template/logout/logout.component";
import {PrincipalComponent} from "./components/template/principal/principal.component";
import {PontoTaxiReadComponent} from "./components/pontos-taxi/ponto-taxi-read/ponto-taxi-read.component";
import {PontoTaxiCreateComponent} from "./components/pontos-taxi/ponto-taxi-create/ponto-taxi-create.component";
import {PontoTaxiEditComponent} from "./components/pontos-taxi/ponto-taxi-edit/ponto-taxi-edit.component";
import {VeiculoReadComponent} from "./components/veiculo/veiculo-read/veiculo-read.component";

registerLocaleData(localePt);

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
    PontoTaxiReadComponent,
    PontoTaxiCreateComponent,
    PontoTaxiEditComponent,
    ModalComponent,
    LoginComponent,
    RegistroComponent,
    LogoutComponent,
    PrincipalComponent,
    VeiculoReadComponent
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
    MatDialogModule
  ],

  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    HttpClientModule,
    AppComponent,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

