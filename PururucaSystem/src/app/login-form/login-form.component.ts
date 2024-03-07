import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      'user': new FormControl(null),
      'password': new FormControl(null),
    });
  }

  login() {
    this.authService.loginUser(this.form.value.user, this.form.value.password).subscribe({
      next: (res) => {
        console.log(res);
        alert("Logou")
        this.router.navigate(['/']);
      },
      error: () => {
        alert("E-mail ou senha inválidos!")
      }
    });
  }

  register() {
    this.authService.signupUser(this.form.value.user, this.form.value.password).subscribe({
      next: (res) => {
        console.log(res);
        alert("Usuário cadastrado!")
        this.router.navigate(['/']);
      },
      error: (erro) => {
        alert("E-mail ou senha inválidos para cadastrar!")
      }
    });
  }
}