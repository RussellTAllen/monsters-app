import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError, map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  private monstersURL = 'https://api.open5e.com/monsters/'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getMonsters(): Observable<any> {
    return this.http.get<any>(this.monstersURL)
        .pipe(
          tap(_ => this.log('Fetched Monsters!')),
          catchError(this.handleError<any>('getMonsters'))
        )
  }

  private log(message: string) {
    console.log(message)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO : send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transofrming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    }
  }
}
