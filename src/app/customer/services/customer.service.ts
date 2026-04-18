import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL_TEMPLATE = "http://localhost:8080/api/customer/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any>{
      return this.http.get(URL_TEMPLATE + 'get-products')
    }
  
  getAllProductsByTermAndSort(term:any, sortBy:any, type:any): Observable<any>{
    return this.http.get(URL_TEMPLATE + 'search?term=' + term + '&sortBy=' + sortBy + '&type=' + type)
  }
}
