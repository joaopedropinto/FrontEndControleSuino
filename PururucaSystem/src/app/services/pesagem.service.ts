import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesagemService {
  private novoPesoAdicionado = new Subject<void>();

  novoPesoAdicionado$ = this.novoPesoAdicionado.asObservable();

  notificarNovoPesoAdicionado() {
    this.novoPesoAdicionado.next();
  }
}
