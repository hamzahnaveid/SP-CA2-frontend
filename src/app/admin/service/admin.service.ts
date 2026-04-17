import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL_TEMPLATE = "http://localhost:8080/api/admin/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryRequest:any): Observable<any>{
    return this.http.post(URL_TEMPLATE + 'add-category', categoryRequest)
  }

  getAllCategories(): Observable<any>{
    return this.http.get(URL_TEMPLATE + 'get-categories')
  }

  addProduct(productRequest:any): Observable<any>{
    return this.http.post(URL_TEMPLATE + 'add-product', productRequest)
  }

  getAllProducts(): Observable<any>{
    return this.http.get(URL_TEMPLATE + 'get-products')
  }
}
