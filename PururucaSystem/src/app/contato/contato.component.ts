import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataBaseService: DataBaseService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  enviarContato(): void {
    if (this.form.valid) {
      this.dataBaseService.enviarContato(this.form.value).subscribe({
        next: (resposta) => {
          console.log('Contato enviado com sucesso!', resposta);
          alert('Mensagem enviada com sucesso!');
          this.form.reset(); // Limpa os campos do formulário
        },
        error: (erro) => {
          console.error('Erro ao enviar contato', erro);
          alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos do formulário corretamente.');
    }
  }
}
