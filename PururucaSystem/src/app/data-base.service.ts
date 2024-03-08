import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ISuino } from '../app/models/suino.model';
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

}
