import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IWeight } from '../models/suino.model';
import { ActivatedRoute } from '@angular/router';
import { DataBaseService } from '../data-base.service';
import { PesagemService } from '../pesagem.service';

Chart.register(...registerables)

@Component({
  selector: 'app-listagem-pesos',
  templateUrl: './listagem-pesos.component.html',
  styleUrl: './listagem-pesos.component.scss'
})
export class ListagemPesosComponent implements OnInit {
  pesos: IWeight[] = []
  arrayPesos: Array<number> = []
  arrayDatas: Array<string> = []
  id: any
  chart!: Chart;

  constructor(private dataBaseService: DataBaseService, private pesagemService: PesagemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchPesos();

    this.pesagemService.novoPesoAdicionado$.subscribe(() => {
      this.fetchPesos();
    });
  }

  async renderChart() {
    if (this.chart) {
      console.log("entrou")
      await this.chart.destroy();
    }

    this.chart = new Chart("ctx", {
      type: 'bar',
      data: {
        labels: this.arrayDatas,
        datasets: [{
          label: 'Pesagens',
          data: this.arrayPesos,
          borderWidth: 1,
          borderColor: '#cdae73',
          backgroundColor: '#cdae73'
        }, {
          type: 'line',
          label: '',
          data: this.arrayPesos,
          borderColor: '#7b7b7b',
          backgroundColor: '#7b7b7b'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  fetchPesos() {
    this.dataBaseService.getPesagensByID(this.id).subscribe((response) => {
      this.pesos = response;
      this.arrayPesos = [];
      this.arrayDatas = [];

      this.pesos.forEach(element => {
        this.arrayPesos.push(element.weight)
        this.arrayDatas.push(element.date)
      });
      this.renderChart();
    });
  }

  deletePesagemByID(idList: any, idItem: any) {
    const indexToRemove = this.pesos.findIndex((pesagem) => pesagem.id = idItem);
    this.dataBaseService.deletePesagemByID(idList, idItem).subscribe(() => {
      this.pesos.splice(indexToRemove, 1);
    });
  }
}

