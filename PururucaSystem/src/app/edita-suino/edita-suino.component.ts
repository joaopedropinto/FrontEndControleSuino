import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../services/data-base.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edita-suino',
  templateUrl: './edita-suino.component.html',
  styleUrls: ['./edita-suino.component.scss']
})
export class EditaSuinoComponent implements OnInit {
  form!: FormGroup;

  constructor(private dataBaseService: DataBaseService, private routes: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'earTag': new FormControl(null, [Validators.required]),
      'fatherEarTag': new FormControl(null, [Validators.required]),
      'motherEarTag': new FormControl(null, [Validators.required]),
      'dateOfBirth': new FormControl(null, [Validators.required]),
      'dateOfDeparture': new FormControl(null, [Validators.required]),
      'status': new FormControl(null, [Validators.required]),
      'gender': new FormControl(null, [Validators.required])
    });
    this.dataBaseService.getSuino(this.route.snapshot.paramMap.get('id')!).subscribe(data => {
      console.log(data);
      this.form.patchValue(data);
    });
  }

  saveSuino() {
    this.dataBaseService.updateSuino(this.route.snapshot.paramMap.get('id')!, this.form.value).subscribe(data => {
      if (data.status == 200) {
        setTimeout(() => {
          this.routes.navigate(['/listagem-suino']);
        }, 100);
      }
    })
  }
}
