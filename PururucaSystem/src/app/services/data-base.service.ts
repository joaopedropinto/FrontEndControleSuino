import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ISuino, IWeight } from '../models/suino.model';
import { IContato } from '../models/contato.model';
import { ISession, ISuinoActivity, ISuinoVaccines } from '../models/session.model';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

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

  addSession(sessionData: ISession): Observable<any> {
    return this.http.post('https://pururucasystem-default-rtdb.firebaseio.com/sessions.json', sessionData);
  }

  getSessions(): Observable<ISession[]> {
    return this.http.get<{ [key: string]: ISession }>('https://pururucasystem-default-rtdb.firebaseio.com/sessions.json',
      {
        params: new HttpParams().set('print', 'pretty')
      }
    )
      .pipe(
        map((responseData) => {
          const sessionArray: ISession[] = [];
          for (const key in responseData) {
            if ((responseData).hasOwnProperty(key)) {
              sessionArray.push({ ...(responseData as any)[key], id: key });
            }
          }
          return sessionArray;
        })
      );
  }

  deleteSession(id: string): Observable<any> {
    return this.http.delete(`https://pururucasystem-default-rtdb.firebaseio.com/sessions/${id}.json`);
  }

  getSession(id: string): Observable<ISession> {
    return this.http.get<ISession>(`https://pururucasystem-default-rtdb.firebaseio.com/sessions/${id}.json`);
  }

  updateSession(id: string, sessionData: ISession): Observable<any> {
    return this.http.put(`https://pururucasystem-default-rtdb.firebaseio.com/sessions/${id}.json`, sessionData, { observe: 'response' });
  }

  getSuinoActivitiesById(id: string) {
    return this.http.get<{ [key: string]: any }>(`https://pururucasystem-default-rtdb.firebaseio.com/activities/${id}/suinos.json`).pipe(
      map(responseData => {
        const suinoActivitiesArray: any[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            suinoActivitiesArray.push({ ...(responseData as any)[key], id: key });
          }
        }
        return suinoActivitiesArray;
      })
    )
  }

  getSuinoActivityByID(id: string, suinoActivityId: string) {
    return this.http.get<ISuinoActivity>(`https://pururucasystem-default-rtdb.firebaseio.com/activities/${id}/suinos/${suinoActivityId}.json`);
  }

  postSuinoActivity(data: any, id: string) {
    return this.http.post(`https://pururucasystem-default-rtdb.firebaseio.com/activities/${id}/suinos.json`, data)
  }

  updateSuinoActivityStatus(sessionId: string | null, suinoId: string, newStatus: boolean): Observable<any> {
    return this.http.patch(`https://pururucasystem-default-rtdb.firebaseio.com/activities/${sessionId}/suinos/${suinoId}/activity.json`, { status: newStatus });
  }

  updateSuinoVaccineStatus(sessionId: string | null, suinoId: string, activityId: any, newStatus: boolean): Observable<any> {
    const updateData: { [key: string]: any } = {};
    updateData[`/activities/${sessionId}/suinos/${suinoId}/activity/${activityId}/status`] = { status: newStatus };

    return this.http.patch(
      'https://pururucasystem-default-rtdb.firebaseio.com/.json',
      updateData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
