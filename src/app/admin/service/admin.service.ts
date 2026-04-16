import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL_TEMPLATE = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryRequest:any): Observable<any>{
    return this.http.post(URL_TEMPLATE + 'api/admin/add-category', categoryRequest)
  }
}
