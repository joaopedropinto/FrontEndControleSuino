import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';
import { earTagValidator } from '../validators/earTag.validator';
@Component({
  selector: 'app-cadastro-suino',
  templateUrl: './cadastro-suino.component.html',
  styleUrls: ['./cadastro-suino.component.scss']
})
export class CadastroSuinoComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataBaseService: DataBaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      earTag: ['', [Validators.required], earTagValidator(this.dataBaseService)], 
      fatherEarTag: ['', Validators.required], 
      motherEarTag: ['', Validators.required], 
      dateOfBirth: ['', Validators.required],
      dateOfDeparture: ['', Validators.required], 
      status: ['', Validators.required], 
      gender: ['', Validators.required]
    });
  }

  addSuino(): void {
    if (this.form.valid) {
      this.dataBaseService.addSuino(this.form.value).subscribe({
        next: () => {
          console.log('Cadastro realizado com sucesso!');
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['listagem-suino']);
          this.form.reset(); 
        },
        error: (erro) => {
          console.error('Erro ao cadastrar suíno:', erro);
          alert('Ocorreu um erro ao cadastrar o suíno. Por favor, tente novamente.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }
}
