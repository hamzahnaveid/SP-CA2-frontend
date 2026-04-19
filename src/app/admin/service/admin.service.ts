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

  deleteProduct(productId:any): Observable<any>{
    return this.http.delete(URL_TEMPLATE + 'delete-product/' + productId)
  }

  getAllProducts(): Observable<any>{
    return this.http.get(URL_TEMPLATE + 'get-products')
  }

  getAllProductsByTermAndSort(term:any, sortBy:any, type:any): Observable<any>{
    return this.http.get(URL_TEMPLATE + 'search?term=' + term + '&sortBy=' + sortBy + '&type=' + type)
  }

  addVoucher(voucherDto:any): Observable<any>{
    return this.http.post(URL_TEMPLATE + 'add-voucher', voucherDto)
  }

  getAllVouchers(): Observable<any>{
    return this.http.get(URL_TEMPLATE + 'get-vouchers')
  }

  getOrders(): Observable<any>{
    return this.http.get(URL_TEMPLATE  + 'get-orders')
  }

  toNextState(orderId:number): Observable<any>{
    return this.http.get(URL_TEMPLATE + 'next-state/' + orderId)
  }
}
