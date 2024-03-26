import { Component, OnInit } from '@angular/core';
import { ISession, ISuinoActivity } from '../models/session.model';
import { DataBaseService } from '../services/data-base.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  styleUrls: ['./sessao.component.scss']
})
export class SessaoComponent implements OnInit {
  session!: ISession;
  suinoActivities!: ISuinoActivity[];

  constructor(private dataBaseService: DataBaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('id');

    if (sessionId) {
      this.dataBaseService.getSession(sessionId).subscribe((data: ISession) => {
        this.session = data;
      });

      this.dataBaseService.getSuinoActivitiesById(sessionId).subscribe((data: ISuinoActivity[]) => {
        console.log(data);
        this.suinoActivities = data;
      });
    }
  }
}
