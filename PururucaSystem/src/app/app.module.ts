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
import { Trash, Edit, FileMinus } from 'angular-feather/icons';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: CadastroSuinoComponent },
  { path: 'login', component: LoginComponent },
];

const icons = {
  Trash,
  Edit,
  FileMinus
};

@NgModule({
  declarations: [
    AppComponent,
    CadastroSuinoComponent,
    LoginComponent
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
