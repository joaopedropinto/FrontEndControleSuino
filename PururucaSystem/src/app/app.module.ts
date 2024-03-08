import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroSuinoComponent } from './cadastro-suino/cadastro-suino.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FeatherModule } from 'angular-feather';
import { Trash, Edit, FileMinus, TrendingUp } from 'angular-feather/icons';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ListagemSuinoComponent } from './listagem-suino/listagem-suino.component';
import { EditaSuinoComponent } from './edita-suino/edita-suino.component';
import { HeaderComponent } from './header/header.component';
import { ListagemPesosComponent } from './listagem-pesos/listagem-pesos.component';
import { CadastraPesagemComponent } from './cadastra-pesagem/cadastra-pesagem.component';
import { HomeComponent } from './home/home.component';
import { EditaPesagemComponent } from './edita-pesagem/edita-pesagem.component';
import { DateFormatPipe } from './date-format.pipe';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'casdastro-suino', component: CadastroSuinoComponent },
  { path: 'cadastro-peso/:id', component: CadastraPesagemComponent },
  { path: 'listagem-suino', component: ListagemSuinoComponent },
  { path: 'listagem-pesos/:id', component: ListagemPesosComponent },
  { path: 'edita/:id', component: EditaSuinoComponent },
  { path: 'edita-pesagem/:id/:pesagemId', component: EditaPesagemComponent },
];

const icons = {
  Trash,
  Edit,
  FileMinus,
  TrendingUp
};

@NgModule({
  declarations: [
    AppComponent,
    CadastroSuinoComponent,
    LoginComponent,
    ListagemSuinoComponent,
    EditaSuinoComponent,
    HeaderComponent,
    ListagemPesosComponent,
    CadastraPesagemComponent,
    HomeComponent,
    EditaPesagemComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FeatherModule.pick(icons)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  exports: [FeatherModule]
})
export class AppModule { }
