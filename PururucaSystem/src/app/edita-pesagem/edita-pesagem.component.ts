import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IWeight } from '../models/suino.model';
import { PesagemService } from '../pesagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBaseService } from '../data-base.service';

@Component({
  selector: 'app-edita-pesagem',
  templateUrl: './edita-pesagem.component.html',
  styleUrls: ['./edita-pesagem.component.scss']
})
export class EditaPesagemComponent implements OnInit {
  form!: FormGroup;
  data!: IWeight;
  id: any;
  pesagemId: any;

  constructor(private dataBaseService: DataBaseService, private pesagemService: PesagemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'weight': new FormControl(null, [Validators.required]),
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.pesagemId = params.get('pesagemId');
    });

    this.dataBaseService.getPesagemByID(this.id, this.pesagemId).subscribe(data => {
      console.log(data);
      this.form.patchValue(data);
    });

  }

  cancel() {
    this.router.navigate([`listagem-pesos/${this.id}`]);
  }

  update() {
    this.dataBaseService.updatePesagem(this.id, this.pesagemId, this.form.value.weight).subscribe(res => {
      console.log(res);
      this.pesagemService.notificarNovoPesoAdicionado();
    });

    this.form.reset();
    this.router.navigate([`listagem-pesos/${this.id}`]);
  }
}
