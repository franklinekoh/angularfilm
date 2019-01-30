import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from './post';
import {Createfilm} from './createfilm';
import { Body } from '@angular/http/src/body';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = 'http://localhost:8000/';

  getFilms() {

    return this.http.get(this.baseUrl + 'films').pipe(
      tap((data) => {
       data
      }),
      catchError(error => {
        // if (error.status === 401 || error.status === 403) {
        //   // handle error
        // }
        // console.log(error)
        return throwError(error);
      })
    );

  }

  getFilm(slug: string){

    return this.http.get(this.baseUrl + 'film/' + slug).pipe(
      tap((data) => {
       data
      }),
      catchError(error => {
        // if (error.status === 401 || error.status === 403) {
        //   // handle error
        // }
        // console.log(error)
        return throwError(error);
      })
    );
  }

  postComment(post: Post, filmId){

    const body: Post = {
        name: post.name,
        comment: post.comment,
        film_id: filmId
    }

    var httpOptions: any = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'auth-token': JSON.parse(localStorage.getItem('currentUser'))['auth_token']
      })
  }

  return this.http.post(this.baseUrl + 'comment', body, httpOptions).pipe(
    tap((data: any) => {
    //  console.log(data)
     
    }),
    catchError(error => {
      // if (error.status === 401 || error.status === 403) {
      //   // handle error
      // }
      // console.log(error)
      return throwError(error);
    })
  );
  }

  createFilm(body){

   

  return this.http.post(this.baseUrl + 'film', body).pipe(
    tap((data: any) => {
    //  console.log(data)
     
    }),
    catchError(error => {
    
      return throwError(error);
    })
  );
  }
  

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  
  //     console.error(error);
  
  //     // TODO: better job of transforming error for user consumption
  //     // this.log(`${operation} failed: ${error.message}`);
  
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //     // return error;
  //   };
  // }
}
