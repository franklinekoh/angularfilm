import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Response } from '@angular/http';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = 'http://localhost:8000/';

  registerUser(register: Register){

    const body: Register = {
      name: register.name,
      email: register.email,
      password: register.password
    }

  var httpOptions: any = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
      })
  }
    return this.http.post(this.baseUrl + 'register', body, httpOptions);
  }
}
