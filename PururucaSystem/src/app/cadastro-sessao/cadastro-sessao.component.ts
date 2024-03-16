import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../services/data-base.service';
import { Router } from '@angular/router';
import { ISuino } from '../models/suino.model';

@Component({
  selector: 'app-cadastro-sessao',
  templateUrl: './cadastro-sessao.component.html',
  styleUrls: ['./cadastro-sessao.component.scss']
})
export class CadastroSessaoComponent implements OnInit {
  form!: FormGroup;
  porcos: string[] = [];
  vacinasPorco: string[] = ['Raiva', 'Renite atrófica']; // exemplo de definição das vacinas
  showVaccines: boolean = false; // Propriedade para controlar a visibilidade do campo de vacinas

  constructor(
    private formBuilder: FormBuilder,
    private dataBaseService: DataBaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sessionDate: ['', Validators.required], 
      sessionDescription: ['', Validators.required], 
      animalTags: ['', Validators.required], 
      plannedActivities: ['', Validators.required],
      vaccines: ['', Validators.required] 
    });

    this.fetchSuinos();
  }

  fetchSuinos(): void {
    this.dataBaseService.getSuinos().subscribe({
      next: (suinos: ISuino[]) => {
        this.porcos = suinos.map(suino => suino.earTag.toString());
      },
      error: (error) => {
        console.error('Erro ao buscar a lista de suínos:', error);
      }
    });
  }

  addSession(): void {
    if (this.form.valid) {
      this.dataBaseService.addSession(this.form.value).subscribe({
        next: () => {
          console.log('Sessão registrada com sucesso!');
          alert('Sessão registrada com sucesso!');
          this.form.reset(); 
        },
        error: (error) => {
          console.error('Erro ao cadastrar sessão:', error);
          alert('Ocorreu um erro ao cadastrar a sessão. Por favor, tente novamente.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }
  
  toggleVaccines(): void {
    const plannedActivities = this.form.get('plannedActivities')?.value;
    this.showVaccines = plannedActivities === 'Vacinação';
  }
}
