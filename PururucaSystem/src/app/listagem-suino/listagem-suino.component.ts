import { Component, OnInit } from '@angular/core';
import { ISuino } from '../models/suino.model'; // Certifique-se de importar o modelo correto de Suíno
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-listagem-suino',
  templateUrl: './listagem-suino.component.html',
  styleUrls: ['./listagem-suino.component.scss']
})
export class ListagemSuinoComponent implements OnInit {
  suinos: ISuino[] = [];

  constructor(private dataBaseService: DataBaseService, private router: Router) { }

  ngOnInit(): void {
    this.fetchSuinos();
  }

  fetchSuinos(): void {
    this.dataBaseService.getSuinos()
      .subscribe(
        (data: ISuino[]) => {
          this.suinos = data;
        },
        (error: any) => {
          console.error('Ocorreu um erro ao buscar os suínos:', error);
        }
      );
  }

  removeSuino(suino: ISuino): void {
    if (suino.id) {
      this.dataBaseService.deleteSuino(suino.id)
        .subscribe(
          () => {
            console.log('Suíno excluído com sucesso.');
            this.fetchSuinos();
          },
          (error: any) => {
            console.error('Ocorreu um erro ao excluir o suíno:', error);
          }
        );
    } else {
      console.error('ID do suíno é indefinido.');
    }
  }
}
