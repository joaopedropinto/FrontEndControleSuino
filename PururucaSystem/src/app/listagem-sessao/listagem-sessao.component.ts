import { Component, OnInit } from '@angular/core';
import { ISession } from '../models/session.model';
import { DataBaseService } from '../services/data-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-sessao',
  templateUrl: './listagem-sessao.component.html',
  styleUrl: './listagem-sessao.component.scss',
})
export class ListagemSessaoComponent implements OnInit {
  sections: ISession[] = [];
  filteredSessions: ISession[] = [];
  sessionDate: string = '';
  sessionDescription: string = '';
  plannedActivities: string = '';

  constructor(
    private dataBaseService: DataBaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchSessions();
  }

  fetchSessions(): void {
    this.dataBaseService.getSessions().subscribe({
      next: (data: ISession[]) => {
        this.sections = data;
        this.filteredSessions = [...this.sections];
      },
      error: (erro) => {
        console.error('Ocorreu um erro ao buscar as sessões:', erro);
      },
    });
  }

  removeSuino(session: ISession): void {
    if (session.id) {
      this.dataBaseService.deleteSession(session.id)
        .subscribe(
          {
            next: () => {
              console.log('Sessão excluída com sucesso.');
              this.fetchSessions();
            },
            error: (erro) => {
              console.error('Ocorreu um erro ao excluir a sessão:', erro);
            }
          }
        );
    } else {
      console.error('ID da sessão é indefinido.');
    }
  }

  applyFilters(): void {
    this.filteredSessions = this.sections.filter(session => {
      return (!this.sessionDate || session.sessionDate.toString().includes(this.sessionDate)) &&
        (!this.plannedActivities || session.plannedActivities.includes(this.plannedActivities));
    });

    console.log(this.filteredSessions)
  }
}
