import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL_TEMPLATE = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, ) { }

  register(registerRequest:any, role:string): Observable<any> {
    return this.http.post(URL_TEMPLATE + "register?role=" + role, registerRequest);
  }

  login(loginRequest:any): Observable<any> {
    return this.http.post(URL_TEMPLATE + "login", loginRequest)
  }
}
