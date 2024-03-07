import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';
import { ageValidator } from '../validators/age.validator';
import { nonFutureDateValidator } from '../validators/non-future-age.validator';

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
      earTag: ['', Validators.required], // Brinco do animal: Aceita somente número e é requerido
      fatherEarTag: ['', Validators.required], // Brinco do pai: Aceita somente número e é requerido
      motherEarTag: ['', Validators.required], // Brinco da mãe: Aceita somente número e é requerido
      dateOfBirth: ['', [Validators.required/*, ageValidator()*/]], // Data de Nascimento: dia / mês / ano e é requerido
      dateOfDeparture: ['', [Validators.required/*, nonFutureDateValidator()*/]], // Data da saída: dia / mês / ano e é requerido
      status: ['', Validators.required], // Status: Pode ser “Ativo”, “Vendido” ou “Morto”
      gender: ['', Validators.required] // Sexo: Pode ser “M” ou “F”
    });
  }

  addSuino(): void {
    if (this.form.valid) {
      this.dataBaseService.addSuino(this.form.value).subscribe({
        next: () => {
          console.log('Cadastro realizado com sucesso!');
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['atendimentos']);
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
