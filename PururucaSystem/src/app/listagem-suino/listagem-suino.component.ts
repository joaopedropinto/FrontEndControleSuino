import { Component, OnInit } from '@angular/core';
import { ISuino } from '../models/suino.model';
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';


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
      .subscribe({
        next: (data: ISuino[]) => {
          this.suinos = data;
        },
        error: (erro) => {
          console.error('Ocorreu um erro ao buscar os suínos:', erro);
        }
      })
  }

  removeSuino(suino: ISuino): void {
    if (suino.id) {
      this.dataBaseService.deleteSuino(suino.id)
        .subscribe(
          {
            next: () => {
              console.log('Suíno excluído com sucesso.');
              this.fetchSuinos();
            },
            error: (erro) => {
              console.error('Ocorreu um erro ao excluir o suíno:', erro);
            }
          }
        );
    } else {
      console.error('ID do suíno é indefinido.');
    }
  }
}
