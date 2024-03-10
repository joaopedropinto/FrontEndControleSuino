import { Component } from '@angular/core';
import { ISuino } from '../models/suino.model';
import { DataBaseService } from '../services/data-base.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-porco',
  templateUrl: './detalhes-porco.component.html',
  styleUrl: './detalhes-porco.component.scss'
})
export class DetalhesPorcoComponent {
  porco!: ISuino

  constructor(private dataBaseService: DataBaseService, private routes: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataBaseService.getSuino(this.route.snapshot.paramMap.get('id')!).subscribe(data => {
      console.log(data)
      this.porco = data
    })
  }
}