import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ISuino, IWeight } from '../models/suino.model';
import { IContato } from '../models/contato.model';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private http: HttpClient) { }

  addSuino(suinoData: ISuino): Observable<any> {
    return this.http.post('https://pururucasystem-default-rtdb.firebaseio.com/suinos.json', suinoData);
  }

  getSuinos() {
    return this.http.get<{ [key: string]: ISuino }>('https://pururucasystem-default-rtdb.firebaseio.com/suinos.json',
      {
        params: new HttpParams().set('print', 'pretty')
      }
    )
      .pipe(
        map((responseData) => {
          const postArray: ISuino[] = [];
          for (const key in responseData) {
            if ((responseData).hasOwnProperty(key)) {
              postArray.push({ ...(responseData as any)[key], id: key });
            }
          }
          return postArray;
        }
        )
      );
  }

  deleteSuino(id: string): Observable<any> {
    return this.http.delete(`https://pururucasystem-default-rtdb.firebaseio.com/suinos/${id}.json`);
  }

  getSuino(id: string): Observable<ISuino> {
    return this.http.get<ISuino>(`https://pururucasystem-default-rtdb.firebaseio.com/suinos/${id}.json`);
  }

  updateSuino(id: string, suinoData: ISuino): Observable<any> {
    return this.http.put(`https://pururucasystem-default-rtdb.firebaseio.com/suinos/${id}.json`, suinoData, { observe: 'response' });
  }

  getPesagens(): Observable<IWeight[]> {
    return this.http.get<{ [key: string]: ISuino }>('https://pururucasystem-default-rtdb.firebaseio.com/data.json').pipe(
      map(responseData => {
        const pesagensArray: IWeight[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            const pesagens: IWeight[] = responseData[key].weighings || [];
            pesagensArray.push(...pesagens);
          }
        }
        return pesagensArray;
      })
    );
  }

  getPesagensByID(id: string) {
    return this.http.get<{ [key: string]: IWeight }>(`https://pururucasystem-default-rtdb.firebaseio.com/data/${id}/pesagens.json`).pipe(
      map(responseData => {
        const pesagensArray: IWeight[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            pesagensArray.push({ ...(responseData as any)[key], id: key });
          }
        }
        return pesagensArray;
      })
    )
  }

  getPesagemByID(id: string, pesagemId: string) {
    return this.http.get<IWeight>(`https://pururucasystem-default-rtdb.firebaseio.com/data/${id}/pesagens/${pesagemId}.json`);
  }

  postPesagem(data: any, id: string) {
    return this.http.post(`https://pururucasystem-default-rtdb.firebaseio.com/data/${id}/pesagens.json`, data)
  }

  updatePesagem(id: string, pesagemId: string, weightValue: number): Observable<any> {
    return this.http.patch(`https://pururucasystem-default-rtdb.firebaseio.com/data/${id}/pesagens/${pesagemId}.json`, { weight: weightValue }, { observe: 'response' });
  }

  deletePesagemByID(idList: string, idItem: string) {
    return this.http.delete<IWeight>(`https://pururucasystem-default-rtdb.firebaseio.com/data/${idList}/pesagens/${idItem}.json`);
  }

  checkEarTagExists(earTag: number): Observable<boolean> {
    return this.getSuinos().pipe(
      map(suinos => suinos.some(suino => suino.earTag === earTag))
    );
  }

  enviarContato(contatoData: IContato): Observable<any> {
    return this.http.post('https://pururucasystem-default-rtdb.firebaseio.com/contatos.json', contatoData);
  }
}
