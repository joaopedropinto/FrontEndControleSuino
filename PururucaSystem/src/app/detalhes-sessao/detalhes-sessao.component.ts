import { Component } from '@angular/core';
import { ISession } from '../models/session.model';
import { DataBaseService } from '../services/data-base.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-sessao',
  templateUrl: './detalhes-sessao.component.html',
  styleUrl: './detalhes-sessao.component.scss'
})
export class DetalhesSessionComponent {
  session!: ISession

  constructor(private dataBaseService: DataBaseService, private routes: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataBaseService.getSession(this.route.snapshot.paramMap.get('id')!).subscribe(data => {
      console.log(data)
      this.session = data
    })
  }
}