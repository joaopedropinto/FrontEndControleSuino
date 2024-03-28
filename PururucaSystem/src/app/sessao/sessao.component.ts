import { Component, OnInit } from '@angular/core';
import { ISession, ISuinoActivity, ISuinoVaccines } from '../models/session.model';
import { DataBaseService } from '../services/data-base.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  styleUrls: ['./sessao.component.scss']
})
export class SessaoComponent implements OnInit {
  session!: ISession;
  suinoActivities!: any[];
  sessionId: string | null = this.route.snapshot.paramMap.get('id')

  constructor(private dataBaseService: DataBaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('id');

    if (sessionId) {
      this.dataBaseService.getSession(sessionId).subscribe((data: ISession) => {
        this.session = data;
      });

      this.dataBaseService.getSuinoActivitiesById(sessionId).subscribe((data: any) => {
        this.suinoActivities = data;
      });
    }
  }

  updateActivityStatus(suinoId: any, newStatus: boolean): void {
    this.dataBaseService.updateSuinoActivityStatus(this.sessionId, suinoId, newStatus)
      .subscribe(() => {
      }, error => {
        console.error('Erro ao atualizar o status da atividade:', error);
      });
  }

  updateVaccineStatus(suinoId: any, activityId: any, newStatus: boolean): void {
    console.log(`https://pururucasystem-default-rtdb.firebaseio.com/activities/${this.sessionId}/suinos/${suinoId}/activity/${activityId}.json`)
    this.dataBaseService.updateSuinoVaccineStatus(this.sessionId, activityId, suinoId, newStatus)
      .subscribe(() => {
      }, error => {
        console.error('Erro ao atualizar o status da atividade:', error);
      });
  }
}
