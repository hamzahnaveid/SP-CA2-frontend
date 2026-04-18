import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

const URL_TEMPLATE = "http://localhost:8080/api/customer/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  getAllProducts(): Observable<any>{
      return this.http.get(URL_TEMPLATE + 'get-products')
    }
  
  getAllProductsByTermAndSort(term:any, sortBy:any, type:any): Observable<any>{
    return this.http.get(URL_TEMPLATE + 'search?term=' + term + '&sortBy=' + sortBy + '&type=' + type)
  }

  addToCart(productId:any): Observable<any>{
    const cartDto = {
      productId: productId,
      userEmail: this.storage.getUser().email
    }

    return this.http.post(URL_TEMPLATE + 'add-to-cart', cartDto)
  }
}
