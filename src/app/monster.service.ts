import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError, map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  monstersData: [] = []
  page: number = 1
  prevPage: number = 1
  private monstersURL = 'https://api.open5e.com/monsters/?page='+this.page
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
  }

  constructor(private http: HttpClient) { }

  changePage(direction: string): void {
    this.prevPage = this.page
    if (direction === "next"){
      this.page++
    }else if(this.page > 1){
      this.page--
    }
    this.monstersURL = 'https://api.open5e.com/monsters/?page='+this.page
  }

  getMonsters(): Observable<any> {
    console.log(this.monstersURL)
    if (!this.monstersData.length || this.page !== this.prevPage){
      this.prevPage = this.page
      return this.http.get<any>(this.monstersURL)
          .pipe(
            map(responseData => {
              this.monstersData = responseData.results
              return this.monstersData
            }),  
            tap(_ => this.log('Fetched Monsters!')),
            catchError(this.handleError<any>('getMonsters'))
          )
    }
    return of(this.monstersData)
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
