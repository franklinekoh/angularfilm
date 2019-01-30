import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Login } from './login';
import { Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }


  readonly baseUrl = 'http://localhost:8000/';

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  login(login: Login){

    const body: Login = {
      
      email: login.email,
      password: login.password
    }

    var httpOptions: any = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
      })
  }

  return this.http.post(this.baseUrl + 'login', body, httpOptions)
  .pipe(
    tap((data: any) => {
     
      if(data.data['auth-token']){
        this.getUser(data.data['auth-token']).subscribe((data: any) => {

          // setting user details in localstorage
          console.log(JSON.stringify(data));
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.setLoggedIn(true);
          return data;
        });
      }
     
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

  setLoggedIn(value: boolean){

    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

   isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  getUser(authToken: string){

    var httpOptions: any = {
      headers: new HttpHeaders({
         'auth-token': authToken,
         
      })
  }

  return this.http.get(this.baseUrl + 'user', httpOptions).pipe(
    tap((data) => {
     data
    }),
    catchError(this.handleError('Auth token', []))
  );

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loggedIn')
}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error);
  
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
      // return error;
    };
  }
}
