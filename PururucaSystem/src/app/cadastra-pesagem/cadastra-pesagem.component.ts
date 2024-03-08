import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../data-base.service';
import { IWeight } from '../models/suino.model';
import { PesagemService } from '../pesagem.service';

@Component({
  selector: 'app-cadastra-pesagem',
  templateUrl: './cadastra-pesagem.component.html',
  styleUrl: './cadastra-pesagem.component.scss'
})
export class CadastraPesagemComponent {
  form!: FormGroup
  data!: IWeight
  id: any

  constructor(private dataBaseService: DataBaseService, private pesagemService: PesagemService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      'weight': new FormControl(null, [Validators.required]),
    });
    this.id = this.route.snapshot.paramMap.get('id');
  }

  cancel() {
    this.router.navigate([`listagem-pesos/${this.id}`]);
  }

  register() {
    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    this.data = {
      weight: this.form.value.weight,
      date: dia + '/' + mes + '/' + ano
    };

    this.dataBaseService.postPesagem(this.data, this.id).subscribe(res => {
      console.log(res);

      this.pesagemService.notificarNovoPesoAdicionado();
    });

    this.form.reset();
    this.router.navigate([`listagem-pesos/${this.id}`]);
  }
}
