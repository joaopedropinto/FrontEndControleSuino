import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../services/data-base.service';
import { Router } from '@angular/router';
import { ISuino } from '../models/suino.model';
import { IActivity } from '../models/session.model';

@Component({
  selector: 'app-cadastro-sessao',
  templateUrl: './cadastro-sessao.component.html',
  styleUrls: ['./cadastro-sessao.component.scss']
})
export class CadastroSessaoComponent implements OnInit {
  form!: FormGroup;
  pigTags: string[] = [];
  displayVaccines: boolean = false;

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
      vaccines: ['']
    });

    this.fetchPigTags();
  }

  fetchPigTags(): void {
    this.dataBaseService.getSuinos().subscribe({
      next: (suinos: ISuino[]) => {
        this.pigTags = suinos.map(suino => suino.earTag.toString());
      },
      error: (error) => {
        console.error('Erro ao buscar a lista de suínos:', error);
      }
    });
  }

  addSession(): void {
    if (this.form.valid) {
      this.dataBaseService.addSession(this.form.value).subscribe({
        next: (res) => {
          if (this.form.value.plannedActivities != "Vacinação") {
            this.form.value.animalTags.forEach((tag: string) => {
              let data = {
                earTag: tag,
                activity: {
                  name: this.form.value.plannedActivities,
                  status: false
                }
              }
              this.dataBaseService.postSuinoActivity(data, res.name).subscribe(res => {
                console.log(res);
              });
            });
          } else {
            this.form.value.animalTags.forEach((tag: string) => {
              let data = {
                earTag: tag,
                activity: [] as IActivity[]
              }
              this.form.value.vaccines.forEach((vaccine: string) => {
                let vaccineData = {
                  name: vaccine,
                  status: false
                }

                data.activity.push(vaccineData)
              });
              this.dataBaseService.postSuinoActivity(data, res.name).subscribe(res => {
                console.log(res);
              });
            });
          }
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
    this.displayVaccines = plannedActivities === 'Vacinação';
  }
}
