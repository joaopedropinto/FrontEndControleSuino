import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISuino } from '../app/models/suino.model'; // Importe a interface ISuino
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private http: HttpClient) { }

  addSuino(suinoData: ISuino): Observable<any> {
    return this.http.post('https://pururucasystem-default-rtdb.firebaseio.com//suinos.json', suinoData); // Endpoint para adicionar suínos
  }

  getSuinos() {
    return this.http.get<{ [key: string]: ISuino }>('https://pururucasystem-default-rtdb.firebaseio.com//suinos.json',
      {
        params: new HttpParams().set('print', 'pretty')
      }
    );
  }

  deleteSuino(id: string) {
    return this.http.delete(`https://pururucasystem-default-rtdb.firebaseio.com//suinos/${id}.json`); // Endpoint para deletar suínos
  }

  getSuino(id: string) {
    return this.http.get<ISuino>(`https://pururucasystem-default-rtdb.firebaseio.com//suinos/${id}.json`);
  }

  updateSuino(id: string, suinoData: ISuino) {
    return this.http.put(`https://pururucasystem-default-rtdb.firebaseio.com//suinos/${id}.json`, suinoData, { observe: 'response' });
  }
}
