import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../storage/storage.service';

const URL_TEMPLATE = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private storage: StorageService) { }

  register(registerRequest:any, role:string): Observable<any> {
    return this.http.post(URL_TEMPLATE + "register?role=" + role, registerRequest);
  }

  login(loginRequest:any): Observable<any> {
    return this.http.post(URL_TEMPLATE + "login", loginRequest).pipe(
      tap((response: any) => {
      this.storage.saveUser(response.user);
      this.storage.saveToken(response.token);
      console.log(response.user)
      console.log(response.token)
      })
    );
  }
}
