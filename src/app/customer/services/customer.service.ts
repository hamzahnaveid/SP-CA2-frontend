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

  addToCart(productId:any, quantity:number): Observable<any>{
    const cartDto = {
      productId: productId,
      userEmail: this.storage.getUser().email,
      quantity: quantity
    }

    return this.http.post(URL_TEMPLATE + 'add-to-cart', cartDto)
  }

  getCartByUserEmail(): Observable<any>{
    const userEmail = this.storage.getUser().email
    return this.http.get(URL_TEMPLATE + 'cart/' + userEmail)
  }

  applyVoucher(code:any): Observable<any>{
    const userEmail = this.storage.getUser().email
    return this.http.get(URL_TEMPLATE + 'apply-voucher/' + userEmail + '/' + code)
  }

  placeOrder(orderDto:any): Observable<any>{
    orderDto = {
      userEmail: this.storage.getUser().email,
      address: orderDto.address,
      payment: orderDto.payment
    }
    console.log(orderDto)
    return this.http.post(URL_TEMPLATE + 'place-order', orderDto)
  }

  getMyOrders(): Observable<any>{
    const userEmail = this.storage.getUser().email;
    return this.http.get(URL_TEMPLATE + 'get-my-orders/' + userEmail)
  }

  getOrderItems(orderId): Observable<any>{
    return this.http.get(URL_TEMPLATE + 'get-order-items/' + orderId)
  }

  addReview(reviewDto:any): Observable<any>{
    return this.http.post(URL_TEMPLATE + 'add-review', reviewDto)
  }

  getAllReviews(productId:any): Observable<any>{
    return this.http.get(URL_TEMPLATE + 'get-reviews/' + productId)
  }
}
