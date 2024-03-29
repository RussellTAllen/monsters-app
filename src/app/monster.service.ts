import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError, map, tap, expand, reduce, EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  monstersData: Array<object> = []
  selectedMonsters: Array<object> = []
  private page: number = 1
  private prevPage: number = 1
  private monstersURL = 'https://api.open5e.com/monsters/?page='+this.page

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
  }

  constructor(private http: HttpClient) { }

  changePage(direction: string): void {
    this.prevPage = this.page
    if (direction === "next"){
      this.page++
    }else if (this.page > 1){
      this.page--
    }
    this.monstersURL = 'https://api.open5e.com/monsters/?page='+this.page
  }

  getMonsters(): Observable<any> {
    if (!this.monstersData.length || this.page !== this.prevPage){
      this.prevPage = this.page
      return this.http.get<any>(this.monstersURL)
          .pipe(
            map(responseData => {
              const { results } = responseData
              results.forEach((monst: any) => {
                if (monst.actions)
                  monst.actions = monst.actions.filter((action: any) => "attack_bonus" in action)
              })
              this.monstersData = results
              return this.monstersData
            }),  
            tap(_ => this.log('Fetched Monsters!')),
            catchError(this.handleError<any>('getMonsters'))
          )
    }
    return of(this.monstersData)
  }

  // TESTING RECURSIVE FETCH 
  getPage(tPage: number): Observable<any> {
    return this.http.get<any>('https://api.open5e.com/monsters/?page='+tPage.toString())
      .pipe(
        map(data => {
          const { results } = data
          results.forEach((monst: any) => {
            if (monst.actions)
              monst.actions = monst.actions.filter((action: any) => "attack_bonus" in action)
          })
          this.monstersData = results
          return this.monstersData
        })
      )
  }

  // TESTING RECURSIVE FETCH
  getAllMonsters(page: number) {
    return this.getPage(page).pipe(
      expand((res) => {
        console.log('resssss', res);
        if (page == 3){
          return EMPTY
        }
        else {
          page++
          console.log(page);
          return this.getPage(page);
        }
      }),
      reduce((acc, curr) => {
        return acc.concat(curr);
      }, [])
    )
  }

  private log(message: string) {
    console.log(message)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    }
  }
}
