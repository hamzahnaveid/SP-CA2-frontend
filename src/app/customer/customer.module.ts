import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../AngularMaterialModule';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderItemsComponent } from './components/order-items/order-items.component';
import { ReviewProductComponent } from './components/review-product/review-product.component';


@NgModule({
  declarations: [
    CustomerComponent,
    HomeComponent,
    CartComponent,
    PlaceOrderComponent,
    MyOrdersComponent,
    OrderItemsComponent,
    ReviewProductComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule
  ]
})
export class CustomerModule { }
